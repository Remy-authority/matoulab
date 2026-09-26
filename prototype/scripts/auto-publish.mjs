// Robot de publication automatique Matoulab ET Reptilab (script IDENTIQUE dans les deux depots).
// 1 execution = 1 article : le PREMIER brouillon de content/drafts/ (ordre par numero NN-slug.md),
// couverture (fal.ai FLUX dev + controle Gemini), 2 schemas SVG, build Astro, deploiement
// Cloudflare Pages, verification en ligne, journal. Brouillons ecrits d'avance (relance du 27/09/2026) :
// Gemini ne fabrique plus d'images (quota gratuit a 0, mesure le 27/09), il ne sert plus qu'au controle.
//
// Variables d'env :
//   FAL_KEY                (obligatoire) couverture via fal.ai
//   GEMINI_API_KEY         (facultatif) controle visuel de la couverture ; absent = pas de controle
//   CLOUDFLARE_API_TOKEN   (obligatoire sauf DRYRUN) deploiement Pages
//   CLOUDFLARE_ACCOUNT_ID  (defaut = compte des deux blogs)
//   SITE                   (facultatif) matoulab | reptilab ; defaut = nom du dossier du depot
//   DRYRUN=1               tout sauf deploiement : l'article et ses images sont retires apres le build,
//                          le brouillon reste en place, rien n'est publie ni journalise.
//
// Codes de sortie : 0 = publie (ou DRYRUN vert, ou stock vide annonce) ; 1 = echec, rien publie.

import { readFile, writeFile, mkdir, readdir, access, unlink, appendFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import yaml from 'js-yaml';

const ROOT = fileURLToPath(new URL('../', import.meta.url));      // prototype/ (fileURLToPath : chemins avec espaces)
const REPO = fileURLToPath(new URL('../../', import.meta.url));   // racine du depot
const DRAFTS = `${REPO}content/drafts/`;
const ART = `${ROOT}src/content/articles/`;
const IMG = `${ROOT}public/images/`;
const JOURNAL = `${REPO}tasks/journal-publication.tsv`;

const SITES = {
  matoulab: {
    domain: 'matoulab.com', project: 'matoulab', pages: 'matoulab.pages.dev',
    pillars: ['comportement', 'alimentation', 'choisir-accueillir', 'hygiene-prevention'],
    credentials: 'Fondateur de Matoulab, passionné de chats',
    colors: { bg: ['#f7f5fd', '#fdf5f0'], dot: ['#7c5cff', '#b14bd6'], stroke: '#ece7fb' },
    style: 'Premium editorial photograph, ultra realistic, soft natural light, shallow depth of field, magazine quality, wide landscape framing, the whole cat centered with space around it, modern tidy home interior.',
    qc: 'pas un vrai chat, tete coupee/hors cadre, chat coupe de facon disgracieuse, anatomie irrealiste (pattes, yeux, oreilles), floue/deformee, texte/logo',
  },
  reptilab: {
    domain: 'reptilab.fr', project: 'reptilab', pages: 'reptilab.pages.dev',
    pillars: ['installer-equiper', 'nourrir', 'comprendre-observer', 'choisir-debuter'],
    credentials: 'Fondateur de Reptilab, passionné de terrariophilie',
    colors: { bg: ['#f2f8f4', '#fbf5ec'], dot: ['#2e8b63', '#d08a3e'], stroke: '#dcefe4' },
    style: 'Premium editorial photograph, ultra realistic, soft natural light, shallow depth of field, magazine quality, wide landscape framing, the whole animal centered with space around it, clean modern well kept enclosure.',
    qc: 'sujet absent ou hors sujet, animal coupe de facon disgracieuse/hors cadre, anatomie irrealiste (pattes, doigts, tete), image floue/deformee, texte/logo',
  },
};
const SITE_ID = process.env.SITE || basename(REPO.replace(/\/$/, ''));
const S = SITES[SITE_ID];
if (!S) { console.error(`ECHEC: site inconnu "${SITE_ID}" (attendu : ${Object.keys(SITES).join(', ')}).`); process.exit(1); }

const DRYRUN = process.env.DRYRUN === '1';
const FAL = process.env.FAL_KEY;
const GEM = process.env.GEMINI_API_KEY;
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || '2edbbf024d9440e907f5fd74d174d0d3';
const SUMMARY = process.env.GITHUB_STEP_SUMMARY;
const QC_MODEL = 'gemini-flash-latest';

const say = async (line) => { console.log(line); if (SUMMARY) await appendFile(SUMMARY, `${line}\n`); };
const stop = async (msg) => { await say(`❌ ${msg}`); process.exit(1); };
const exists = (p) => access(p).then(() => true).catch(() => false);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const nodash = (s) => String(s ?? '').replace(/\s*[—–]\s*/g, ', ').replace(/ ,/g, ',');
const esc = (s) => nodash(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- Couverture : fal.ai FLUX dev ----------
async function falBalance() {
  const r = await fetch('https://rest.alpha.fal.ai/billing/user_balance', { headers: { Authorization: `Key ${FAL}` } });
  if (!r.ok) throw new Error(`solde fal.ai illisible (HTTP ${r.status})`);
  return Number(await r.text());
}
async function falImage(prompt) {
  for (let essai = 1; essai <= 4; essai++) {
    const r = await fetch('https://fal.run/fal-ai/flux/dev', {
      method: 'POST', headers: { Authorization: `Key ${FAL}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image_size: { width: 1280, height: 720 }, num_inference_steps: 28, num_images: 1, enable_safety_checker: true }),
    });
    const t = await r.text();
    if (r.status === 403 && /TOP_UP|balance|locked/i.test(t)) { console.log(`fal.ai verrou de solde (essai ${essai}), attente 90 s...`); await sleep(90000); continue; }
    if (!r.ok) throw new Error(`fal.ai HTTP ${r.status}: ${t.slice(0, 200)}`);
    const url = JSON.parse(t)?.images?.[0]?.url;
    if (!url) throw new Error('fal.ai : pas d image dans la reponse');
    const img = await fetch(url);
    if (!img.ok) throw new Error(`telechargement image HTTP ${img.status}`);
    return Buffer.from(await img.arrayBuffer());
  }
  throw new Error('fal.ai : verrou de solde persistant apres 4 essais');
}
async function qcImage(webp, scene) {
  if (!GEM) return { ok: true, raison: 'controle Gemini absent' };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${QC_MODEL}:generateContent?key=${GEM}`;
  const q = `Banniere de couverture large d'un blog. Reponds JSON {"ok":true|false,"raison":"..."}. ok=false si : ${S.qc}, ou hors sujet (attendu: ${scene}). Tolere une marge serree.`;
  const body = { contents: [{ role: 'user', parts: [{ inlineData: { mimeType: 'image/webp', data: webp.toString('base64') } }, { text: q }] }] };
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) return { ok: true, raison: `controle indisponible (HTTP ${r.status})` };
    const t = ((await r.json())?.candidates?.[0]?.content?.parts || []).map((p) => p.text).join('');
    return JSON.parse(t.replace(/```json|```/g, '').trim());
  } catch { return { ok: true, raison: 'controle illisible' }; }
}

// ---------- Schemas SVG de marque (carte 2x2) ----------
function infographic(spec) {
  const c = S.colors;
  const pts = (spec.points || []).slice(0, 4);
  const pos = [[60, 86], [520, 86], [60, 224], [520, 224]];
  const cards = pts.map((p, i) => {
    const [x, y] = pos[i]; const cx = x + 60, cy = y + 60;
    const parts = String(p).split(':');
    const h = esc(parts[0].trim()); const dRaw = nodash((parts.slice(1).join(':') || '').trim());
    // Explication sur 2 lignes au-dela de 34 caracteres (la carte laisse ~320 px de texte).
    const lines = [];
    for (const w of dRaw.split(/\s+/)) {
      if (lines.length && (lines[lines.length - 1] + ' ' + w).length <= 34) lines[lines.length - 1] += ' ' + w; else lines.push(w);
    }
    const two = lines.length > 1;
    const dy = two ? [cy + 16, cy + 36] : [cy + 24];
    const dTxt = lines.slice(0, 2).map((l, k) => `<text class="t d" x="${cx + 40}" y="${dy[k]}">${esc(k === 1 && lines.length > 2 ? lines.slice(1).join(' ') : l)}</text>`).join('');
    const hy = two ? cy - 12 : cy - 6;
    const hSize = h.length > 24 ? ' style="font-size:17px"' : '';
    return `<g class="s"><rect x="${x}" y="${y}" width="420" height="120" rx="18" fill="#fff" stroke="${c.stroke}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="22" fill="url(#dot)"/><path d="M${cx - 10} ${cy} l7 8 l14 -16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text class="t h" x="${cx + 40}" y="${hy}"${hSize}>${h}</text>${dTxt}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="1000" height="400" role="img" aria-label="${esc(spec.title)}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.bg[0]}"/><stop offset="1" stop-color="${c.bg[1]}"/></linearGradient><linearGradient id="dot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.dot[0]}"/><stop offset="1" stop-color="${c.dot[1]}"/></linearGradient><style>.t{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}.title{font-weight:800;font-size:29px;fill:#21232b}.h{font-weight:800;font-size:19px;fill:#21232b}.d{font-weight:500;font-size:16px;fill:#5a616e}@keyframes pop{from{opacity:0}to{opacity:1}}@media(prefers-reduced-motion:no-preference){.s{opacity:0;animation:pop .5s ease forwards}}</style></defs><rect width="1000" height="400" rx="24" fill="url(#bg)"/><text class="t title" x="500" y="52" text-anchor="middle">${esc(spec.title)}</text>${cards}<text class="t" x="880" y="384" font-size="14" fill="#6a7180" text-anchor="end">${S.domain}</text></svg>`;
}

// ---------- Lecture et controle du brouillon ----------
function parseDraft(txt, file) {
  const m = txt.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file} : frontmatter introuvable`);
  const fm = yaml.load(m[1]);
  const body = m[2];
  const manque = ['title', 'description', 'pillar', 'coverScene', 'coverAlt', 'tldr', 'faq', 'graphics'].filter((k) => !fm?.[k]);
  if (manque.length) throw new Error(`${file} : champ(s) manquant(s) ${manque.join(', ')}`);
  if (!S.pillars.includes(fm.pillar)) throw new Error(`${file} : rubrique "${fm.pillar}" hors liste (${S.pillars.join(', ')})`);
  if (!Array.isArray(fm.faq) || fm.faq.length !== 4) throw new Error(`${file} : il faut exactement 4 questions`);
  for (const g of ['g1', 'g2']) {
    const pts = fm.graphics?.[g]?.points;
    if (!fm.graphics?.[g]?.title || !Array.isArray(pts) || pts.length !== 4) throw new Error(`${file} : schema ${g} incomplet (titre + 4 points)`);
    if ((body.match(new RegExp(`\\{\\{${g}\\}\\}`, 'g')) || []).length !== 1) throw new Error(`${file} : marqueur {{${g}}} absent ou double dans le corps`);
  }
  if (/[—–]/.test(txt)) throw new Error(`${file} : tiret long present`);
  return { fm, body };
}

async function main() {
  await say(`## Robot ${S.domain}${DRYRUN ? ' (essai a blanc, rien publie)' : ''}`);
  await mkdir(DRAFTS, { recursive: true });
  const drafts = (await readdir(DRAFTS)).filter((f) => /^\d{2,3}-[a-z0-9-]+\.md$/.test(f)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  if (!drafts.length) {
    await say(`⚠️ STOCK VIDE : plus aucun brouillon dans content/drafts/. Rien n'a ete publie aujourd'hui. Ecrire de nouveaux brouillons pour relancer ${S.domain}.`);
    console.log(`::warning title=Stock de brouillons vide::${S.domain} n'a plus de brouillon, rien publie.`);
    return;
  }
  if (process.env.CHECK === '1') {
    // Controle de TOUT le stock, sans rien fabriquer : node scripts/auto-publish.mjs avec CHECK=1
    const pub = new Set((await readdir(ART)).map((f) => f.replace(/\.md$/, '')));
    const seen = new Set(); let bad = 0;
    for (const f of drafts) {
      const sl = f.replace(/^\d+-/, '').replace(/\.md$/, ''); const pb = [];
      try {
        const { fm, body } = parseDraft(await readFile(DRAFTS + f, 'utf8'), f);
        if (pub.has(sl)) pb.push('deja publie');
        if (seen.has(sl)) pb.push('slug en double'); seen.add(sl);
        const dl = String(fm.description).length; if (dl < 110 || dl > 160) pb.push(`description ${dl} car.`);
        for (const g of ['g1', 'g2']) for (const p of fm.graphics[g].points) {
          const [h, ...r] = String(p).split(':'); if (!r.length || h.trim().length > 26 || r.join(':').trim().length > 44) pb.push(`point trop long ou sans ":" (${p})`);
        }
        const mots = body.replace(/\{\{g[12]\}\}/g, '').split(/\s+/).filter(Boolean).length; if (mots < 650 || mots > 1100) pb.push(`${mots} mots`);
        for (const [, s] of body.matchAll(/\]\(\/([a-z0-9-]+)\/?\)/g)) if (!pub.has(s) && !S.pillars.includes(s)) pb.push(`lien vers /${s} inexistant`);
      } catch (e) { pb.push(e.message); }
      if (pb.length) bad++;
      console.log(`${pb.length ? 'KO' : 'OK'} ${f}${pb.length ? ' : ' + pb.join(' ; ') : ''}`);
    }
    // Repetitions entre brouillons : suites de 6 mots communes (corps seul, hors bloc sources).
    // Au-dela de 3 suites partagees avec un meme brouillon, les deux sont KO (empreinte visible).
    const grams = {};
    for (const f of drafts) {
      const txt = (await readFile(DRAFTS + f, 'utf8')).split(/\n---\n/).slice(1).join('\n').split('## Pour aller plus loin (sources)')[0];
      const w = txt.toLowerCase().replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[^a-zàâäçéèêëîïôöùûüœ0-9' ]+/g, ' ').split(/\s+/).filter(Boolean);
      grams[f] = new Set(); for (let i = 0; i + 6 <= w.length; i++) grams[f].add(w.slice(i, i + 6).join(' '));
    }
    const rep = [];
    for (let i = 0; i < drafts.length; i++) for (let j = i + 1; j < drafts.length; j++) {
      const a = grams[drafts[i]], b = grams[drafts[j]]; const com = [...a].filter((g) => b.has(g));
      if (com.length > 3) rep.push(`${drafts[i]} / ${drafts[j]} : ${com.length} suites communes (« ${com[0]} »)`);
    }
    for (const r of rep) console.log(`KO repetition ${r}`);
    if (rep.length) bad += rep.length;
    console.log(`VERDICT : ${drafts.length - bad < 0 ? 0 : drafts.length - bad}/${drafts.length} brouillons conformes${rep.length ? `, ${rep.length} paire(s) trop repetitive(s)` : ''}`);
    process.exit(bad ? 1 : 0);
  }
  if (drafts.length <= 6) console.log(`::warning title=Stock de brouillons bas::${S.domain} : ${drafts.length} brouillon(s) restant(s), dont celui d'aujourd'hui.`);
  if (!FAL) await stop('FAL_KEY manquant : impossible de fabriquer la couverture.');
  if (!DRYRUN && !CF_TOKEN) await stop('CLOUDFLARE_API_TOKEN manquant.');

  const file = drafts[0];
  const slug = file.replace(/^\d+-/, '').replace(/\.md$/, '');
  const published = (await readdir(ART)).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
  if (published.includes(slug)) await stop(`${file} : l'article "${slug}" existe deja, doublon refuse (retirer le brouillon).`);
  let d;
  try { d = parseDraft(await readFile(DRAFTS + file, 'utf8'), file); } catch (e) { await stop(e.message); }
  const { fm } = d;
  await say(`Brouillon : ${file} (${fm.pillar}), ${drafts.length - 1} restant(s) apres celui-ci.`);

  // 1. Couverture (solde lu AVANT, arret sous 2 $)
  const solde = await falBalance().catch((e) => stop(e.message));
  if (solde < 2) await stop(`solde fal.ai trop bas (${solde.toFixed(2)} $), recharge necessaire avant de publier.`);
  await mkdir(IMG, { recursive: true });
  const coverFile = `${slug}-cover-v3.webp`;
  let coverOk = false, essais = 0;
  for (let i = 1; i <= 4 && !coverOk; i++) {
    essais = i;
    try {
      const raw = await falImage(`${fm.coverScene} ${S.style}`);
      const buf = await sharp(raw).rotate().resize(1200, 630, { fit: 'cover', position: 'centre' }).webp({ quality: 82 }).toBuffer();
      const v = await qcImage(buf, fm.coverScene);
      if (!v.ok) { console.log(`Couverture refusee au controle (essai ${i}) : ${v.raison}`); continue; }
      await writeFile(IMG + coverFile, buf); coverOk = true;
      console.log(`Couverture OK (essai ${i})${v.raison ? ` : ${v.raison}` : ''}`);
    } catch (e) { console.log(`Couverture essai ${i} en echec : ${e.message}`); }
  }
  if (!coverOk) await stop(`couverture non obtenue apres ${essais} essais, rien publie (le brouillon reste en tete).`);

  // 2. Schemas
  await writeFile(`${IMG}${slug}-g1.svg`, infographic(fm.graphics.g1));
  await writeFile(`${IMG}${slug}-g2.svg`, infographic(fm.graphics.g2));

  // 3. Corps : schemas a leur place, liens internes vers des pages qui existent seulement
  const valid = new Set([...published, ...S.pillars]);
  let body = d.body
    .replace('{{g1}}', `![${esc(fm.graphics.g1.title)}](/images/${slug}-g1.svg)`)
    .replace('{{g2}}', `![${esc(fm.graphics.g2.title)}](/images/${slug}-g2.svg)`)
    .replace(/\[([^\]]+)\]\(\/([a-z0-9-]+)\/?\)/g, (all, txt, s) => (valid.has(s) ? `[${txt}](/${s})` : txt));
  body = nodash(body.trim()) + '\n';

  // 4. Frontmatter final (schema de src/content.config.ts)
  const today = new Date().toISOString().slice(0, 10);
  const products = (fm.products || []).filter((p) => p?.partner && p?.url && p?.label);
  const out = {
    title: nodash(fm.title), description: nodash(fm.description), pillar: fm.pillar, kind: 'cluster',
    cover: `/images/${coverFile}`, coverAlt: nodash(fm.coverAlt), clusterParent: fm.pillar,
    author: { name: 'Rémy Zaoui', slug: 'remy-zaoui', credentials: S.credentials },
    updatedAt: today, ymyl: false, medLevel: 'none', disclaimer: false,
    affiliate: products.length > 0, ...(products.length ? { products } : {}),
    tldr: nodash(fm.tldr), faq: fm.faq.map((f) => ({ q: nodash(f.q), a: nodash(f.a) })), status: 'published',
  };
  const md = `---\n${yaml.dump(out, { lineWidth: -1, quotingType: '"', forceQuotes: true })}---\n\n${body}`;
  const artPath = `${ART}${slug}.md`;
  await writeFile(artPath, md);

  // 5. Toute image referencee doit exister
  for (const r of new Set([...md.matchAll(/\/images\/([^\s"')]+)/g)].map((x) => x[1]))) {
    if (!(await exists(IMG + r))) { await unlink(artPath); await stop(`image referencee absente (${r}), rien publie.`); }
  }

  // 6. Build obligatoire vert
  try { execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' }); }
  catch { await unlink(artPath); await stop('build en echec, rien publie (le brouillon reste en tete).'); }
  if (!(await exists(`${ROOT}dist/${slug}/index.html`))) { await unlink(artPath); await stop(`build vert mais page dist/${slug}/ absente, rien publie.`); }
  await say(`✅ Build vert : ${slug}`);

  if (DRYRUN) {
    for (const f of [artPath, IMG + coverFile, `${IMG}${slug}-g1.svg`, `${IMG}${slug}-g2.svg`]) await unlink(f).catch(() => {});
    await say(`DRYRUN : rien deploye ; article et images retires, brouillon ${file} garde en tete.`);
    return;
  }

  // 7. Deploiement
  execFileSync('npx', ['wrangler', 'pages', 'deploy', 'dist', '--project-name', S.project, '--branch', 'main', '--commit-dirty=true'],
    { cwd: ROOT, stdio: 'inherit', env: { ...process.env, CLOUDFLARE_API_TOKEN: CF_TOKEN, CLOUDFLARE_ACCOUNT_ID: CF_ACCOUNT } });

  // 8. Brouillon consomme + journal (commites par le workflow)
  await unlink(DRAFTS + file);
  if (!(await exists(JOURNAL))) await writeFile(JOURNAL, 'date\tslug\turl\tcouverture\tbrouillons_restants\n');
  const url = `https://${S.domain}/${slug}/`;
  await appendFile(JOURNAL, `${today}\t${slug}\t${url}\tfal-flux-dev (${essais} essai(s))\t${drafts.length - 1}\n`);

  // 9. Verification en ligne sur l'URL technique (jamais l'apex juste apres un deploiement)
  const check = `https://${S.pages}/${slug}/`;
  let code = 0;
  for (let i = 1; i <= 10 && code !== 200; i++) { code = (await fetch(check).catch(() => ({ status: 0 }))).status; if (code !== 200) await sleep(6000); }
  const cov = (await fetch(`https://${S.pages}/images/${coverFile}`).catch(() => ({ status: 0 }))).status;
  if (code !== 200 || cov !== 200) await stop(`deploye mais verification en ligne ratee (page ${code}, couverture ${cov}) : ${check}`);
  await say(`✅ PUBLIE : ${url} (page 200 et couverture 200 sur ${S.pages}), ${drafts.length - 1} brouillon(s) restant(s).`);
}
main().catch(async (e) => { await say(`❌ ECHEC : ${e.message}`); process.exit(1); });
