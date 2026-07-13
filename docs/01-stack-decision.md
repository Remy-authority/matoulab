# Livrable 1 — Choix de stack (recommandation sourcée)

**Sources vérifiées le 2026-07-11.** Tout ci-dessous est gratuit/open-source. Aucune brique payante retenue.

## Recommandation

> **Astro (SSG) + Decap CMS (revue humaine par Pull Request) + Cloudflare Pages (hébergement) — coût 0 €.**
> Alternative crédible : **Hugo** si la vitesse de build à très grande échelle (des dizaines de blogs × milliers de pages) devient la contrainte n°1.

### Pourquoi Astro plutôt que Hugo / Eleventy / CMS headless

| Critère (pondéré pour NOTRE cas) | Verdict |
|---|---|
| **Coût** | Astro = MIT, gratuit ([LICENSE](https://github.com/withastro/astro/blob/main/LICENSE)). Hugo Apache-2.0, 11ty MIT. Tous 0 €. |
| **SEO technique** | Astro = **0 JS client par défaut** → HTML léger, bons Core Web Vitals ; `<Image/>` intégré (Sharp, WebP/AVIF, srcset, anti-CLS) ([docs images](https://docs.astro.build/en/guides/images/)) ; sitemap i18n hreflang + RSS officiels ([sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)). |
| **Garde-fou YMYL au build** | **Décisif.** Les *Content Collections typées* d'Astro ([i18n + collections](https://docs.astro.build/en/guides/internationalization/)) permettent d'**imposer par schéma** (voir `prototype/src/content.config.ts`) qu'une page santé ne se construise pas sans `vetReview` + `disclaimer`. Hugo/11ty n'offrent pas ce typage strict natif → garde-fou faible. C'est ce qui aligne la stack sur la règle YMYL d'AUT-3. |
| **Revue humaine avant publication** | **Decap CMS** (MIT) : *editorial workflow* = **1 Pull Request par brouillon** (Draft → In Review → Ready), pilotée par un éditeur non-technique via une UI web, fusionnée par nous pour publier ([editorial workflows](https://decapcms.org/docs/editorial-workflows/)). UX type-CMS **+** gate d'approbation git, sans CMS payant. |
| **Duplicabilité multi-blogs FR→EN** | i18n routing natif (v4+) ; un *template repo* Astro (thème + composants E-E-A-T partagés + config par blog) se clone par niche. Contenu = markdown/MDX → zéro lock-in, on peut changer de couche CMS. |
| **Écosystème / risque** | Grande communauté active. Risque principal = Sveltia (jeune) → on **standardise sur Decap** (plus éprouvé, MIT). |

**Pourquoi pas un CMS headless (Strapi/Directus) :** open-source mais nécessitent d'**héberger un backend + base de données** en permanence → friction et coût récurrent par blog, contre l'objectif 0 dépense et duplication à bas coût.

**Pourquoi Astro plutôt que Hugo malgré la vitesse de Hugo** (Hugo rend ~10 000 pages en ~10 s, [hugo.io](https://gohugo.io/)) : au démarrage on privilégie **qualité > quantité** (peu de pages, chacune revue). Le typage strict E-E-A-T/YMYL et l'authoring par composants d'Astro servent directement notre garde-fou véto. On garde Hugo comme plan B si le réseau devient massif.

## Hébergement 0 € compatible (à ne PAS acheter tant que Rémy n'a pas validé — porté par AUT-5)
- **Cloudflare Pages** — 500 builds/mois, **bande passante illimitée** ([limits](https://developers.cloudflare.com/pages/platform/limits/)). *Défaut recommandé.*
- Netlify free — 100 GB + 300 min build/mois ([pricing](https://www.netlify.com/pricing/)).
- GitHub Pages — 100 GB souple, ~10 builds/h ([limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)).

> ⚠️ Un **domaine** (~10-15 €/an) reste la seule dépense incompressible pour lancer — **demande de budget portée par AUT-5**, pas ici.

## Risques & mitigations
1. **Build/limites free-tier à l'échelle** : 500 builds/mois Cloudflare partagés entre blogs → batcher les builds. Mitigation suffisante au démarrage (1 blog).
2. **Maturité couche CMS** (Sveltia jeune) → rester sur **Decap** ; contenu en markdown = réversible.
3. **Courbe Astro/Go** : si l'équipe édito grossit, Decop masque la technique aux rédacteurs ; nous gardons le contrôle du repo.

*Détails comparatifs complets (Hugo/11ty/Sveltia, tableaux sourcés) : voir recherche agent stack dans le transcript de ce run.*
