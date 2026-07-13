# Livrable 2 (Build) — État & vérification

**Date : 2026-07-11.** AUT-4 livré (`done`) → build AUT-5 démarré.
**Build vérifié localement : `npm run build` = ✅ 10 pages + sitemap générés, sans erreur.**

Aucune dépense engagée. Aucun déploiement. Le domaine `matoulab.fr` (validé par Rémy) n'est **pas** acheté — achat différé au go-live.

---

## Ce qui est construit et vérifié (sans dépense)

| Brique | Fichier(s) | Statut |
|---|---|---|
| **Coquille HTML + SEO** | `src/layouts/BaseLayout.astro` | ✅ `<title>`, meta description, **canonical**, Open Graph, `og:locale=fr_FR`, lien sitemap |
| **Analytics cookieless** | `src/components/Analytics.astro`, `.env.example` | ✅ Cloudflare Web Analytics, **sans cookie → pas de bandeau**. Script émis uniquement si `PUBLIC_CF_ANALYTICS_TOKEN` présent (absent en local) |
| **Accueil** | `src/pages/index.astro` | ✅ liste piliers + derniers articles |
| **Route unifiée** | `src/pages/[slug].astro` | ✅ rend piliers, articles, pages légales ; **brouillons en `noindex`** tant que `status ≠ published` |
| **Pages piliers (cocon)** | `src/content/piliers/comportement.md`, `hygiene-prevention.md` | ✅ 2 têtes de cocon (Pilier 1 autorité + Pilier 4 revenu), maillage vers clusters |
| **Pages légales câblées** | `src/content/legal/*.md` (4) + route | ✅ mentions légales, confidentialité, affiliation, disclaimer véto — routables, liées en pied de page |
| **Pages auteurs** | `src/pages/auteurs/[slug].astro`, `src/data/authors.json` | ✅ route générée pour chaque auteur référencé (**pas de 404**) ; profil non confirmé = bandeau + `noindex` (garde-fou : aucune identité inventée) |
| **CMS revue humaine** | `public/admin/index.html`, `public/admin/config.yml` | ✅ Decap CMS, **`publish_mode: editorial_workflow`** (1 PR par brouillon, fusion = publication). Champs YMYL (vetReview) exposés. Backend git `[[À COMPLÉTER au go-live]]` |
| **robots.txt** | `public/robots.txt` | ✅ `Disallow: /admin/` + `/uploads/`, lien sitemap |
| **Sitemap** | `@astrojs/sitemap` (pinné 3.2.1 pour Astro 4) | ✅ `sitemap-index.xml` généré sur `https://matoulab.fr` |
| **Garde-fou YMYL** | `src/content.config.ts` (hérité AUT-4) | ✅ le build **échoue** si une page santé n'a pas `vetReview` + `disclaimer` |

**Correctif technique appliqué :** `@astrojs/sitemap@3.7.3` (installé par défaut) est incompatible avec Astro 4.16 (`_routes` undefined au hook `build:done`). Pinné à **`@astrojs/sitemap@3.2.1`** → build vert.

---

## Ce qui reste — et pourquoi c'est bloqué sur une décision humaine

Ces points ne sont **pas** des tâches techniques que je peux faire seul :

### 1. Go-live (Livrable 4) — dépend de Rémy
- **Achat `matoulab.fr`** (OVH ~6 €) : je n'ai **ni moyen de paiement ni compte registrar**. → Rémy achète, ou me donne accès.
- **Déploiement Cloudflare Pages** : nécessite un **compte Cloudflare** + connexion d'un dépôt git. Même contrainte d'accès.
- **Astuce sans dépense possible** : on peut déployer d'abord sur un sous-domaine gratuit `*.pages.dev` (site réel, mesurable, **0 €**) **avant** d'acheter le domaine — si Rémy me donne accès à un compte Cloudflare.
- Search Console + soumission sitemap : après mise en ligne.

### 2. Contenu cornerstone santé (Livrable 3, Pilier 4) — dépend d'un vétérinaire réel
- Les articles YMYL (litière/prévention médicale) **ne peuvent pas être publiés sans relecture d'un vétérinaire réel** (garde-fou codé). → Il faut sécuriser un vétérinaire relecteur (freelance/partenariat). **Je n'inventerai jamais de diplôme.**

### 3. Identité auteur E-E-A-T — dépend de Rémy
- Tous les contenus référencent un auteur ; les profils sont **non confirmés** (bandeau + noindex). → Qui est l'auteur nommé réel (Rémy ? un rédacteur recruté ?). Sans ça, pas de publication crédible.

---

## Comment relancer / vérifier

```bash
cd autoblog-chat/prototype
npm install
npm run build      # → dist/ : 10 pages + sitemap, build vert
npm run dev        # → aperçu local http://localhost:4321
```

## Reste à faire au go-live (checklist)
- [ ] Rémy : achat `matoulab.fr` (ou accès registrar) + accès Cloudflare
- [ ] Créer le dépôt git réel → renseigner `backend.repo` dans `admin/config.yml`
- [ ] Créer le token Cloudflare Web Analytics → secret `PUBLIC_CF_ANALYTICS_TOKEN`
- [ ] Passer les pages légales `draft → published` après validation juridique humaine + compléter les `[[À COMPLÉTER]]` (identité éditeur réelle)
- [ ] Filtrer le sitemap sur `status: published` uniquement (aujourd'hui tout est draft/noindex)
- [ ] Sécuriser un vétérinaire relecteur avant toute page santé publiée
- [ ] Confirmer l'auteur nommé (E-E-A-T) → `authors.json` `confirmed: true`
- [ ] Après mise en ligne : Search Console, soumission sitemap, contrôle Core Web Vitals / mobile / schema.org

*Livrable 2 (build) — CEO Auto Blog IA, 2026-07-11.*
