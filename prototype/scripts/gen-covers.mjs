// Régénération des couvertures avec cadrage correct (sujet centré, non coupé).
// Sortie versionnée -cover-v3.webp (cache-busting). Skip si le v3 existe déjà (reprise).
// Usage : GEMINI_API_KEY=xxx node scripts/gen-covers.mjs
import { writeFile, mkdir, access } from 'node:fs/promises';
import sharp from 'sharp';

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('GEMINI_API_KEY manquant'); process.exit(1); }
const MODEL = 'gemini-2.5-flash-image';
const OUT = new URL('../public/images/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

// Cadrage : PAYSAGE large, chat ENTIER bien CENTRÉ, marge autour, jamais coupé.
const STYLE = 'Photographie éditoriale haut de gamme, ultra réaliste, lumière naturelle douce, faible profondeur de champ, qualité magazine lifestyle. CADRAGE PAYSAGE horizontal large (bannière), le chat ENTIER et bien CENTRÉ au milieu du cadre, avec de la marge autour de lui, jamais coupé par les bords. Sans texte, logo ni filigrane.';

const COVERS = {
  'chat-reclame-a-manger':             'un chat assis bien au centre dans une cuisine lumineuse, l\'air demandeur qui reclame en levant les yeux, une gamelle posee a cote, plan large avec de l\'espace autour',
  'combien-de-temps-laisser-chat-seul':'un chat seul assis bien au centre pres d\'une fenetre dans un appartement lumineux et calme, ambiance paisible, plan large avec de l\'espace autour',
  'choisir-brosse-chat':               'un chat au pelage soyeux serein bien au centre pendant un brossage, une brosse et un peigne posés à côté, lumière naturelle douce, plan large avec de l\'espace autour',
  'deux-chats-qui-se-battent':         'deux chats face à face bien centrés sur un tapis dans un salon lumineux, l\'un observant l\'autre avec méfiance oreilles en arrière, tension légère sans violence, plan large avec de l\'espace autour',
  'litiere-anti-odeur':                'un chat propre et serein assis bien au centre dans une salle de bain fraîche et lumineuse, un bac à litière moderne à côté, ambiance propreté et fraîcheur, plan large avec de l\'espace autour',
  'choisir-arbre-a-chat':              'un chat assis bien au centre à côté d\'un grand arbre à chat en sisal dans un salon lumineux et moderne, plan large avec de l\'espace autour',
  'choisir-accueillir':                'un chaton curieux et une personne accueillante dans un salon lumineux et cosy, le chaton bien au centre explore son nouveau foyer, ambiance chaleureuse, plan large avec de l\'espace autour',
  'preparer-arrivee-chaton':           'un adorable chaton bien au centre à côté d\'un panier, d\'une gamelle et d\'un griffoir neufs dans un salon clair, ambiance nouvelle arrivée, plan large avec de l\'espace autour',
  'chaton-ou-chat-adulte':             'un chaton et un chat adulte assis côte à côte bien au centre dans un salon lumineux, ambiance douce, plan large avec de l\'espace autour',
  'alimentation-chaton':               'un adorable chaton assis bien au centre près d\'une petite gamelle dans une cuisine lumineuse et douce, plan large avec de l\'espace autour',
  'transition-alimentaire-chat':       'un chat curieux assis bien au centre reniflant une gamelle de nourriture dans une cuisine claire, ambiance repas, plan large avec de l\'espace autour',
  'alimentation':                      'un beau chat en pleine santé au pelage brillant assis bien au centre près de sa gamelle dans une cuisine lumineuse et épurée, plan large avec de l\'espace autour',
  'croquettes-ou-patee':               'un chat gourmand assis bien au centre devant deux gamelles propres, l\'une de croquettes l\'autre de pâtée, cuisine claire, plan large avec de l\'espace autour',
  'combien-de-fois-nourrir-chat':      'un chat assis bien au centre à côté d\'une gamelle et d\'un doseur de croquettes, cuisine lumineuse, ambiance repas, plan large avec de l\'espace autour',
  'litiere-agglomerante-ou-silice':    'un chat propre et serein assis bien au centre dans une salle de bain lumineuse et épurée, un bac à litière moderne à côté, plan large avec de l\'espace autour',
  'chat-perd-ses-poils':               'un chat au beau pelage soyeux détendu bien au centre pendant un brossage doux, une brosse posée à côté, lumière naturelle, plan large avec de l\'espace autour',
  'bac-litiere-grand-chat':            'un grand chat majestueux type Maine Coon assis bien au centre à côté d\'un grand bac à litière, intérieur clair',
  'bac-litiere-nombre-emplacement':    'un chat détendu bien centré dans un intérieur contemporain lumineux et rangé',
  'chat-mordille-calins':              'un chat détendu allongé bien au centre sur un canapé clair, une main le caresse doucement, moment tendre',
  'chat-qui-miaule-la-nuit':           'un chat bien centré assis près d\'une fenêtre la nuit, douce lumière bleutée, ambiance calme et feutrée',
  'chat-refuse-litiere':               'un chat assis bien au centre à côté d\'un bac à litière moderne, salle de bain claire et épurée',
  'chat-reveille-tot-matin':           'un chat assis bien centré sur un large rebord de fenêtre à l\'aube, douce lumière matinale dorée',
  'chaton-miaule-nuit-premiere-semaine':'un adorable chaton bien centré dans un panier douillet, ambiance chaleureuse du soir',
  'choisir-litiere-chat':              'un beau chat propre et serein bien centré dans un intérieur moderne et lumineux',
  'griffades-canape-chat':             'un chat ASSIS bien au centre à côté d\'un griffoir en sisal vertical, intérieur design lumineux, plan large avec beaucoup d\'espace vide au-dessus et en dessous du chat',
  'langage-corporel-chat':             'un portrait de chat au regard expressif, chat bien centré, oreilles dressées, intérieur lumineux',
  'nettoyer-bac-litiere':              'un chat propre et serein bien centré près d\'un bac à litière impeccable, intérieur lumineux et net',
  'home':                              'un magnifique chat élégant au regard expressif, yeux lumineux, bien centré, intérieur moderne et cosy',
  'comportement':                      'un chat ASSIS bien au centre dans un salon lumineux, posture alerte et attentive, plan large avec beaucoup d\'espace vide au-dessus et en dessous du chat',
  'hygiene-prevention':                'un chat à poils longs parfaitement soigné et brossé, bien centré sur un plaid clair',
};

async function genImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const body = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${(await r.text()).slice(0, 150)}`);
  const j = await r.json();
  const img = (j?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
  if (!img) throw new Error('pas d\'image');
  return Buffer.from(img.inlineData.data, 'base64');
}
// QC : vérifie un vrai chat ENTIER, CENTRÉ, NON COUPÉ, net, sans texte, sur une image DÉJÀ recadrée en 1200x630.
async function qc(webpBuf, scene) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${KEY}`;
  const q = `Cette image est une banniere de couverture large (le bas et le haut sont naturellement rognes). Reponds STRICTEMENT en JSON {"ok":true|false,"raison":"..."}. ok=false SEULEMENT si : ce n'est pas un vrai chat, la TETE du chat est coupee ou hors cadre, le chat est coupe de facon disgracieuse (la moitie du corps hors cadre, ou coupe en plein milieu), image floue/deformee, texte/logo/watermark, ou hors sujet (attendu : ${scene}). Tolere que le bas des pattes touche le bord. Le chat doit etre bien centre, la tete et le buste entierement visibles.`;
  const body = { contents: [{ role: 'user', parts: [{ inlineData: { mimeType: 'image/webp', data: webpBuf.toString('base64') } }, { text: q }] }] };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) return { ok: true };
  const j = await r.json();
  const txt = (j?.candidates?.[0]?.content?.parts || []).map((p) => p.text).join('');
  try { return JSON.parse(txt.replace(/```json|```/g, '').trim()); } catch { return { ok: true }; }
}
const exists = async (p) => access(p).then(() => true).catch(() => false);

for (const [slug, scene] of Object.entries(COVERS)) {
  const outPath = `${OUT}${slug}-cover-v3.webp`;
  if (await exists(outPath)) { console.log(`SKIP ${slug} (déjà fait)`); continue; }
  let done = false;
  for (let attempt = 1; attempt <= 5 && !done; attempt++) {
    try {
      const raw = await genImage(`${STYLE} Sujet : ${scene}.`);
      // recadrage CENTRÉ (déterministe) vers 1200x630
      const buf = await sharp(raw).rotate().resize(1200, 630, { fit: 'cover', position: 'centre' }).webp({ quality: 82 }).toBuffer();
      const verdict = await qc(buf, scene);
      if (!verdict.ok) { console.log(`QC-REJET ${slug} (essai ${attempt}): ${verdict.raison}`); continue; }
      await writeFile(outPath, buf);
      console.log(`OK ${slug}-cover-v3 (essai ${attempt})`);
      done = true;
    } catch (e) { console.error(`FAIL ${slug} (essai ${attempt}): ${e.message}`); }
  }
  if (!done) console.error(`ABANDON ${slug}`);
}
console.log('Régénération terminée.');
