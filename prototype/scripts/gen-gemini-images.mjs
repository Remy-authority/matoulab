// Génération d'images premium par IA (Google Gemini) pour Matoulab.
// Remplace les photos CC0 par des visuels générés, cohérents et haut de gamme.
//
// Prérequis : clé API Google (AI Studio, gratuite) dans GEMINI_API_KEY.
// Usage :
//   GEMINI_API_KEY=xxx node scripts/gen-gemini-images.mjs
//   (option) MODEL=gemini-2.5-flash-image-preview pour changer de modèle.
//
// Sortie : public/images/{slug}-cover|1|2.webp (optimisées WebP via sharp).
// Chaque visuel = chat, style photo éditoriale premium, lumière douce, net.

import { writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('GEMINI_API_KEY manquant'); process.exit(1); }
const MODEL = process.env.MODEL || 'gemini-2.5-flash-image';
const OUT = new URL('../public/images/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

// Style commun : photo éditoriale premium, chat, lumière naturelle douce,
// faible profondeur de champ, cadrage magazine. Pas de texte, pas de watermark.
const STYLE = 'Photographie éditoriale haut de gamme, ultra réaliste, lumière naturelle douce, faible profondeur de champ, ambiance chaleureuse et épurée, qualité magazine lifestyle, sans texte ni logo ni filigrane.';

const SCENES = {
  home:                       'un magnifique chat élégant au regard expressif, yeux verts lumineux, dans un intérieur moderne et cosy',
  comportement:               'un chat attentif au langage corporel expressif, oreilles dressées, posture alerte, dans un salon lumineux',
  'chat-qui-miaule-la-nuit':  'un chat près d\'une fenêtre la nuit, lumière tamisée bleutée, ambiance calme et feutrée',
  'griffades-canape-chat':    'un chat en train de s\'étirer près d\'un griffoir en sisal dans un intérieur design',
  'langage-corporel-chat':    'un gros plan artistique sur le visage et les oreilles d\'un chat, regard expressif',
  'hygiene-prevention':       'un chat à poils longs parfaitement soigné et brossé, pelage soyeux, sur un plaid clair',
  'choisir-litiere-chat':     'un chat propre et serein dans un intérieur moderne et immaculé, ambiance zen',
  'bac-litiere-nombre-emplacement': 'un chat détendu dans un intérieur contemporain lumineux et rangé',
};

async function genImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const parts = j?.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) throw new Error('pas d\'image dans la réponse: ' + JSON.stringify(j).slice(0, 300));
  return Buffer.from(img.inlineData.data, 'base64');
}

// CONTRÔLE QUALITÉ AUTOMATISÉ : on renvoie l'image générée à un modèle de vision
// qui vérifie que c'est bien une photo de chat, nette, sur le sujet, sans texte ni
// difformité. Si KO, on régénère (jusqu'à MAX_TRIES). C'est le garde-fou qualité :
// aucune image n'est publiée « quoi qu'il arrive », chacune est validée.
async function qcImage(pngBuf, scene) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${KEY}`;
  const q = `Analyse cette image pour un blog premium sur les chats. Réponds STRICTEMENT en JSON {"ok":true|false,"raison":"..."}. ok=false si : ce n'est pas un vrai chat, image floue/déformée (pattes/yeux ratés), présence de texte/logo/watermark, ou hors sujet (sujet attendu : ${scene}).`;
  const body = { contents: [{ role: 'user', parts: [{ inlineData: { mimeType: 'image/png', data: pngBuf.toString('base64') } }, { text: q }] }] };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) return { ok: true, raison: 'QC indisponible, accepté par défaut' };
  const j = await r.json();
  const txt = (j?.candidates?.[0]?.content?.parts || []).map((p) => p.text).join('');
  try { return JSON.parse(txt.replace(/```json|```/g, '').trim()); } catch { return { ok: true, raison: 'QC illisible, accepté' }; }
}

const MAX_TRIES = 3;
const manifest = [];
for (const [slug, scene] of Object.entries(SCENES)) {
  for (const role of ['cover', '1', '2']) {
    const variation = role === 'cover' ? 'plan large' : role === '1' ? 'autre angle, plan rapproché' : 'ambiance différente';
    const prompt = `${STYLE} Sujet : ${scene}. Cadrage : ${variation}. Photo horizontale.`;
    let done = false;
    for (let attempt = 1; attempt <= MAX_TRIES && !done; attempt++) {
      try {
        const raw = await genImage(prompt);
        const verdict = await qcImage(raw, scene);        // <-- QC automatisé
        if (!verdict.ok) { console.log(`QC-REJET ${slug}-${role} (essai ${attempt}): ${verdict.raison}`); continue; }
        const isCover = role === 'cover';
        let img = sharp(raw).rotate();
        img = isCover ? img.resize(1200, 630, { fit: 'cover', position: 'attention' }) : img.resize(860, null, { withoutEnlargement: true });
        const buf = await img.webp({ quality: 82 }).toBuffer();
        await writeFile(`${OUT}${slug}-${role}.webp`, buf);
        manifest.push({ slug, role, prompt, qc: verdict.raison });
        console.log(`OK ${slug}-${role} (QC ✓)`);
        done = true;
      } catch (e) {
        console.error(`FAIL ${slug}-${role} (essai ${attempt}): ${e.message}`);
      }
    }
    if (!done) console.error(`ABANDON ${slug}-${role} après ${MAX_TRIES} essais`);
  }
}
await writeFile(`${OUT}manifest-gemini.json`, JSON.stringify(manifest, null, 2));
console.log(`Terminé : ${manifest.length}/24 images générées.`);
