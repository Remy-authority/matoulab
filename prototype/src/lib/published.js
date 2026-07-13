// Source de vérité unique du gating de publication (AUT-10).
//
// Règle : seul un contenu `status: published` doit être exposé publiquement —
// dans le sitemap, sur la page d'accueil et dans les listes de maillage interne
// (cocons de piliers). Les brouillons (draft / in_review / vet_review / approved)
// restent construits en `noindex` pour la prévisualisation humaine, mais ne sont
// JAMAIS listés ni référencés, pour ne pas envoyer à Google un signal
// contradictoire (lien/sitemap qui pointe vers une page noindex).
//
// NB : la génération du sitemap (astro.config.mjs) applique la MÊME règle en
// relisant le frontmatter `status` (elle n'a pas accès à astro:content).
export const PUBLISHED_STATUS = 'published';

/** Une entrée de collection (article/pilier) est-elle publiable en production ? */
export const isPublished = (entry) => entry?.data?.status === PUBLISHED_STATUS;
