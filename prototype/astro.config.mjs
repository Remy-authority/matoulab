import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

// --- Gating sitemap (AUT-10) ---------------------------------------------------
// Le sitemap ne doit lister QUE les contenus publiés. Les brouillons
// (draft/in_review/vet_review/approved) sont bien construits en `noindex` pour
// la relecture humaine, mais les inclure dans le sitemap enverrait à Google un
// signal contradictoire (URL soumise au crawl alors que la page est noindex).
// Le rendu (astro:content) applique la même règle via src/lib/published.js ;
// ici on relit directement le frontmatter `status` car astro.config n'a pas
// accès aux collections.
const CONTENT_DIRS = ['articles', 'piliers', 'legal'];
const unpublishedSlugs = new Set();
for (const dir of CONTENT_DIRS) {
  const dirUrl = new URL(`./src/content/${dir}/`, import.meta.url);
  let files = [];
  try {
    files = readdirSync(dirUrl).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  } catch {
    continue; // dossier absent : rien à exclure
  }
  for (const file of files) {
    const raw = readFileSync(fileURLToPath(new URL(file, dirUrl)), 'utf8');
    const status = matter(raw).data?.status;
    if (status !== 'published') {
      unpublishedSlugs.add(file.replace(/\.mdx?$/, ''));
    }
  }
}

// Une page est exclue du sitemap si son slug racine (/mon-article/) correspond
// à un contenu non publié. On garde le filet `/exemple` par sécurité (page de
// démonstration).
const sitemapFilter = (page) => {
  if (page.includes('/exemple')) return false;
  const path = new URL(page).pathname.replace(/^\/|\/$/g, ''); // "/mon-article/" -> "mon-article"
  return !unpublishedSlugs.has(path);
};

// Config prototype. i18n FR (défaut) → EN prêt pour la duplication multi-blogs.
// SEO technique : sitemap officiel ; images optimisées par défaut (Sharp).
// --- URL canonique paramétrable (AUT-11) --------------------------------------
// Le `site` pilote le sitemap ET toutes les URL canoniques / og:image / schema
// (voir src/layouts/BaseLayout.astro, qui dérive tout de `Astro.site`).
// Ordre de priorité, conçu pour ne JAMAIS émettre de canonique vers un domaine
// qui ne résout pas :
//   1. SITE_URL   → override explicite (build local, ou lancement gratuit d'un
//                   nouveau blog de l'usine : SITE_URL=https://<blog>.pages.dev,
//                   puis on bascule vers le vrai domaine une fois acheté+branché).
//   2. CF_PAGES_URL → injecté automatiquement par Cloudflare Pages = l'URL
//                   *.pages.dev réelle du déploiement (jamais morte).
//   3. Défaut de prod = https://matoulab.com (domaine acheté + LIVE depuis
//                   2026-07-11, custom domain branché sur Pages).
// Pour repasser un blog en go-live gratuit : `SITE_URL=https://xxx.pages.dev npm run build`.
const SITE_URL =
  process.env.SITE_URL || process.env.CF_PAGES_URL || 'https://matoulab.com';

export default defineConfig({
  site: SITE_URL,
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({ filter: sitemapFilter })],
  build: { inlineStylesheets: 'auto' },
});
