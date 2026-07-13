// Robot de publication automatique Matoulab (100% gratuit : Gemini free tier + Cloudflare Pages).
// 1 execution = 1 nouvel article (texte + couverture + 2 infographies) build + deploiement + verif.
// Concu pour tourner en local ET dans GitHub Actions (cron 3x/semaine).
//
// Variables d'env :
//   GEMINI_API_KEY         (obligatoire) cle Gemini (offre gratuite)
//   CLOUDFLARE_API_TOKEN   (obligatoire sauf DRYRUN) token Pages
//   CLOUDFLARE_ACCOUNT_ID  (defaut = compte Matoulab)
//   DRYRUN=1               genere + build, NE deploie PAS, ne modifie pas la file
//
// Garde-fous : aucune depense, E-E-A-T (pas de faux expert, sante non-diagnostique + renvoi veto,
// sources citees, pas de stats inventees), dedup obligatoire, build vert avant deploiement.

import { readFile, writeFile, mkdir, readdir, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = new URL('../', import.meta.url).pathname;          // prototype/
const ART = `${ROOT}src/content/articles/`;
const PIL = `${ROOT}src/content/piliers/`;
const IMG = `${ROOT}public/images/`;
const QUEUE = `${ROOT}scripts/topics-queue.json`;

const KEY = process.env.GEMINI_API_KEY;
const DRYRUN = process.env.DRYRUN === '1';
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || '2edbbf024d9440e907f5fd74d174d0d3';
if (!KEY) { console.error('STOP: GEMINI_API_KEY manquant'); process.exit(1); }
if (!DRYRUN && !CF_TOKEN) { console.error('STOP: CLOUDFLARE_API_TOKEN manquant (token invalide/absent)'); process.exit(1); }

const TEXT_MODEL = 'gemini-flash-latest';
const IMG_MODEL = 'gemini-2.5-flash-image';
const exists = (p) => access(p).then(() => true).catch(() => false);
const nodash = (s) => (s || '').replace(/[—–]/g, ', ').replace(/ ,/g, ',');

async function geminiText(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${KEY}`;
  let last;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const body = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, responseMimeType: 'application/json' } };
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) { last = new Error(`Gemini texte ${r.status}`); continue; }
    const j = await r.json();
    const txt = (j?.candidates?.[0]?.content?.parts || []).map((p) => p.text).join('').replace(/```json|```/g, '').trim();
    try { return JSON.parse(txt); }
    catch (e) { last = e; console.log(`JSON invalide (essai ${attempt}), on regenere...`); }
  }
  throw new Error(`JSON Gemini illisible apres 4 essais: ${last?.message}`);
}
async function geminiImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMG_MODEL}:generateContent?key=${KEY}`;
  const body = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`Gemini image ${r.status}`);
  const j = await r.json();
  const img = (j?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
  if (!img) throw new Error('pas d image');
  return Buffer.from(img.inlineData.data, 'base64');
}
async function qcImage(webp, scene) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${KEY}`;
  const q = `Banniere de couverture large. Reponds JSON {"ok":true|false,"raison":"..."}. ok=false si : pas un vrai chat, tete coupee/hors cadre, chat coupe de facon disgracieuse, floue/deformee, texte/logo, ou hors sujet (attendu: ${scene}). Tolere le bas des pattes au bord.`;
  const body = { contents: [{ role: 'user', parts: [{ inlineData: { mimeType: 'image/webp', data: webp.toString('base64') } }, { text: q }] }] };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) return { ok: true };
  const j = await r.json();
  const t = (j?.candidates?.[0]?.content?.parts || []).map((p) => p.text).join('');
  try { return JSON.parse(t.replace(/```json|```/g, '').trim()); } catch { return { ok: true }; }
}
const esc = (s) => nodash(String(s)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Infographie templatisee de marque (carte 2x2 a puces).
function infographic(spec) {
  const pts = (spec.points || []).slice(0, 4);
  const pos = [[60, 86], [520, 86], [60, 224], [520, 224]];
  const cards = pts.map((p, i) => {
    const [x, y] = pos[i]; const cx = x + 60, cy = y + 60;
    const parts = String(p).split(':');
    const h = esc(parts[0].trim()); const d = esc((parts.slice(1).join(':') || '').trim());
    return `<g class="s"><rect x="${x}" y="${y}" width="420" height="120" rx="18" fill="#fff" stroke="#ece7fb" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="22" fill="url(#dot)"/><path d="M${cx - 10} ${cy} l7 8 l14 -16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text class="t h" x="${cx + 40}" y="${cy - 6}">${h}</text><text class="t d" x="${cx + 40}" y="${cy + 24}">${d}</text></g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="1000" height="400" role="img" aria-label="${esc(spec.title)}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f5fd"/><stop offset="1" stop-color="#fdf5f0"/></linearGradient><linearGradient id="dot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#b14bd6"/></linearGradient><style>.t{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}.title{font-weight:800;font-size:29px;fill:#21232b}.h{font-weight:800;font-size:19px;fill:#21232b}.d{font-weight:500;font-size:16px;fill:#5a616e}@keyframes pop{from{opacity:0}to{opacity:1}}@media(prefers-reduced-motion:no-preference){.s{opacity:0;animation:pop .5s ease forwards}}</style></defs><rect width="1000" height="400" rx="24" fill="url(#bg)"/><text class="t title" x="500" y="52" text-anchor="middle">${esc(spec.title)}</text>${cards}<text class="t" x="880" y="384" font-size="14" fill="#6a7180" text-anchor="end">matoulab.com</text></svg>`;
}

async function main() {
  const queue = JSON.parse(await readFile(QUEUE, 'utf8'));
  const existingFiles = (await readdir(ART)).filter((f) => f.endsWith('.md'));
  const existingSlugs = existingFiles.map((f) => f.replace('.md', ''));
  // 1. Choisir le prochain sujet non produit (dedup)
  const topic = (queue.topics || []).find((t) => !existingSlugs.includes(t.slug));
  if (!topic) { console.error('STOP: file de sujets epuisee -> reapprovisionner (recherche mots-cles).'); process.exit(2); }
  console.log(`Sujet: ${topic.slug} (${topic.pillar})`);
  if (queue.topics.filter((t) => !existingSlugs.includes(t.slug)).length < 6) console.log('ALERTE: moins de 6 sujets restants -> prevoir un reapprovisionnement.');

  // Titres existants pour le maillage interne
  const known = [];
  for (const f of existingFiles) { const c = await readFile(ART + f, 'utf8'); const m = c.match(/^title:\s*"([^"]+)"/m); if (m) known.push({ slug: f.replace('.md', ''), title: m[1] }); }

  // 2. Texte via Gemini (JSON structure)
  const prompt = `Tu es Remy Zaoui, fondateur passionne de chats du blog Matoulab (100% chat, francais). Ecris un article de blog complet, utile, original et bien structure sur : "${topic.title}" (requete cible : "${topic.keyword}"), pilier ${topic.pillar}.
REGLES ABSOLUES :
- Francais. ~700 mots au total dans le corps.
- TON sobre, informatif et premium, adresse au lecteur en "vous". N'ecris PAS d'introduction familiere ("Salut", "c'est Remy", "passionnes de felins"), pas de premiere personne, pas d'emoji.
- N'inclus AUCUN lien markdown dans intro/sections (le maillage interne est ajoute automatiquement apres).
- JAMAIS de tiret cadratin ni demi-cadratin. Utilise des virgules ou des parentheses.
- Sante NON diagnostique : prevention/lifestyle uniquement, et renvoi au veterinaire pour tout symptome. Aucune stat inventee.
- Tu n'es PAS veterinaire : jamais de fausse expertise.
- Sources reelles et generiques : International Cat Care (icatcare.org) et ASPCA (aspca.org).
- Maillage : propose 2 liens internes pertinents parmi cette liste (slug -> titre) : ${known.map((k) => k.slug).join(', ')}.
Reponds STRICTEMENT en JSON avec ce schema :
{"description":"meta description 150 car max","coverAlt":"alt de la photo de couverture","tldr":"resume 3-4 phrases","faq":[{"q":"...","a":"..."},{"q":"...","a":"..."},{"q":"...","a":"..."},{"q":"...","a":"..."}],"intro":"paragraphe d intro 2-3 phrases","sections":[{"h2":"titre section","body":"1-2 paragraphes"},{"h2":"...","body":"..."},{"h2":"...","body":"..."},{"h2":"...","body":"..."}],"graphic1":{"title":"titre infographie 1 (max 6 mots)","points":["Mot cle: courte explication","...","...","..."]},"graphic2":{"title":"titre infographie 2","points":["...","...","...","..."]},"internalLinks":[{"slug":"...","label":"texte du lien"},{"slug":"...","label":"..."}]}`;
  const d = await geminiText(prompt);

  // 3. Couverture (image + QC)
  const STYLE = 'Photographie editoriale haut de gamme, ultra realiste, lumiere naturelle douce, faible profondeur de champ, qualite magazine. CADRAGE PAYSAGE large, chat ENTIER bien CENTRE, marge autour, jamais coupe. Sans texte ni logo.';
  await mkdir(IMG, { recursive: true });
  let coverOk = false;
  for (let i = 1; i <= 5 && !coverOk; i++) {
    try {
      const raw = await geminiImage(`${STYLE} Sujet : ${topic.scene}.`);
      const buf = await sharp(raw).rotate().resize(1200, 630, { fit: 'cover', position: 'centre' }).webp({ quality: 82 }).toBuffer();
      const v = await qcImage(buf, topic.scene);
      if (!v.ok) { console.log(`QC-rejet cover (essai ${i}): ${v.raison}`); continue; }
      await writeFile(`${IMG}${topic.slug}-cover-v3.webp`, buf); coverOk = true;
    } catch (e) { console.log(`cover essai ${i} echec: ${e.message}`); }
  }
  if (!coverOk) { console.error('STOP: couverture non generee (QC).'); process.exit(3); }

  // 4. Infographies templatisees
  await writeFile(`${IMG}${topic.slug}-g1.svg`, infographic(d.graphic1));
  await writeFile(`${IMG}${topic.slug}-g2.svg`, infographic(d.graphic2));

  // 5. Assembler le markdown
  const faq = d.faq.slice(0, 4).map((f) => `  - q: ${JSON.stringify(nodash(f.q))}\n    a: ${JSON.stringify(nodash(f.a))}`).join('\n');
  const secs = d.sections || [];
  let body = `${nodash(d.intro)}\n\n![${esc(d.graphic1.title)}](/images/${topic.slug}-g1.svg)\n\n`;
  secs.forEach((s, i) => {
    body += `## ${nodash(s.h2)}\n\n${nodash(s.body)}\n\n`;
    if (i === Math.min(2, secs.length - 1)) body += `![${esc(d.graphic2.title)}](/images/${topic.slug}-g2.svg)\n\n`;
  });
  // Securite : corrige les liens internes sans slash que Gemini aurait glisses, puis retire tout lien du corps (on remaille proprement)
  body = body.replace(/\]\((?!https?:|\/|#)([a-z0-9-]+)\)/g, '](/$1)');
  const links = (d.internalLinks || []).filter((l) => existingSlugs.includes(l.slug)).slice(0, 2)
    .map((l) => `[${nodash(l.label)}](/${l.slug})`).join(' et ');
  if (links) body += `Pour aller plus loin, voyez aussi ${links}.\n\n`;
  body += `## Pour aller plus loin (sources)\n\n- **International Cat Care** : [icatcare.org](https://icatcare.org/)\n- **ASPCA, cat care** : [aspca.org](https://www.aspca.org/pet-care/cat-care)\n\n*Ce guide est informatif et ne remplace pas l'avis d'un vétérinaire.*\n`;

  const fm = `---\ntitle: ${JSON.stringify(nodash(topic.title))}\ndescription: ${JSON.stringify(nodash(d.description))}\npillar: ${topic.pillar}\nkind: cluster\ncover: "/images/${topic.slug}-cover-v3.webp"\ncoverAlt: ${JSON.stringify(nodash(d.coverAlt))}\nclusterParent: "${topic.pillar}"\nauthor:\n  name: "Rémy Zaoui"\n  slug: "remy-zaoui"\n  credentials: "Fondateur de Matoulab, passionné de chats"\nupdatedAt: "${new Date().toISOString().slice(0, 10)}"\nymyl: false\nmedLevel: none\ndisclaimer: false\naffiliate: false\ntldr: ${JSON.stringify(nodash(d.tldr))}\nfaq:\n${faq}\nstatus: published\n---\n\n`;
  await writeFile(`${ART}${topic.slug}.md`, fm + body);

  // 6. Ajouter au sommaire du pilier
  const pilPath = `${PIL}${topic.pillar}.md`;
  if (await exists(pilPath)) {
    let p = await readFile(pilPath, 'utf8');
    if (p.includes('## Dans ce guide') && !p.includes(`/${topic.slug})`)) {
      p = p.replace(/(## Dans ce guide\n)/, `$1\n- [${nodash(topic.title)}](/${topic.slug})`);
      await writeFile(pilPath, p);
    }
  }

  // 7. Build (obligatoire vert)
  console.log('Build...');
  execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' });
  console.log(`Article genere: ${topic.slug} (build vert).`);

  if (DRYRUN) { console.log('DRYRUN: pas de deploiement, file inchangee.'); return; }

  // 8. Deploiement
  execFileSync('npx', ['wrangler', 'pages', 'deploy', 'dist', '--project-name', 'matoulab', '--branch', 'main'],
    { cwd: ROOT, stdio: 'inherit', env: { ...process.env, CLOUDFLARE_API_TOKEN: CF_TOKEN, CLOUDFLARE_ACCOUNT_ID: CF_ACCOUNT } });

  // 9. Retirer le sujet de la file
  queue.topics = queue.topics.filter((t) => t.slug !== topic.slug);
  await writeFile(QUEUE, JSON.stringify(queue, null, 2));
  console.log(`PUBLIE: https://matoulab.com/${topic.slug}/`);
}
main().catch((e) => { console.error('ECHEC:', e.message); process.exit(1); });
