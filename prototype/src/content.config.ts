import { defineCollection, z } from 'astro:content';

/**
 * Schéma de contenu — garde-fous E-E-A-T + YMYL au niveau du typage.
 * Un article ne peut pas être construit sans auteur, date de MAJ, et —
 * s'il est marqué YMYL/MED — sans un reviewer vétérinaire + disclaimer.
 * Le build ÉCHOUE si la contrainte n'est pas respectée (superRefine ci-dessous).
 */

const author = z.object({
  name: z.string(),               // auteur nommé (E-E-A-T)
  slug: z.string(),               // -> /auteurs/{slug}
  credentials: z.string().optional(),
});

const vetReview = z.object({
  reviewerName: z.string(),       // "révisé par Dr X, vétérinaire"
  reviewerCredential: z.string(), // ex: "Docteur vétérinaire, ONV n°..."
  reviewedAt: z.string(),         // date ISO de la revue
});

const base = {
  title: z.string(),
  description: z.string().max(160),          // meta description
  pillar: z.enum(['comportement', 'alimentation', 'choisir-accueillir', 'hygiene-prevention']),
  author,
  publishedAt: z.string().optional(),        // vide tant que non publié
  updatedAt: z.string(),                      // date de mise à jour (E-E-A-T)
  ymyl: z.boolean().default(false),           // page santé/sécurité => véto obligatoire
  medLevel: z.enum(['none', 'MED']).default('none'),
  vetReview: vetReview.optional(),
  disclaimer: z.boolean().default(false),     // "ne remplace pas une consultation vétérinaire"
  affiliate: z.boolean().default(false),      // page contenant des liens affiliés => disclosure
  status: z.enum(['draft', 'in_review', 'vet_review', 'approved', 'published']).default('draft'),
  clusterParent: z.string().optional(),       // slug de la page pilier (cocon/maillage)
  cover: z.string().optional(),               // image de couverture (chemin /images/...)
  coverAlt: z.string().optional(),            // texte alternatif de la couverture
  tldr: z.string().optional(),                // GEO : "Réponse rapide" citable par les IA
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(), // GEO : FAQPage schema
};

const ymylGuard = (data: any, ctx: z.RefinementCtx) => {
  if (data.ymyl || data.medLevel === 'MED') {
    if (!data.vetReview) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Page YMYL/MED : vetReview obligatoire (relecture véto).' });
    }
    if (!data.disclaimer) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Page YMYL/MED : disclaimer obligatoire.' });
    }
  }
  // Une page ne peut être "published" que si approuvée + (si YMYL) revue véto présente.
  if (data.status === 'published' && (data.ymyl && !data.vetReview)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Publication YMYL sans revue véto interdite.' });
  }
};

const piliers = defineCollection({
  type: 'content',
  schema: z.object({ ...base, kind: z.literal('pilier').default('pilier') }).superRefine(ymylGuard),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({ ...base, kind: z.literal('cluster').default('cluster') }).superRefine(ymylGuard),
});

// Pages légales : obligation d'affichage (LCEN/SREN, RGPD/CNIL, transparence
// affiliation, disclaimer YMYL). Schéma minimal — pas de garde-fou véto ici.
const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    updatedAt: z.string(),
    status: z.enum(['draft', 'approved', 'published']).default('draft'),
  }),
});

export const collections = { piliers, articles, legal };
