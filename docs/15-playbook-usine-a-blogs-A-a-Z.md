# Autoblog IA — Playbook A → Z (process complet, réplicable)

> Runbook opérationnel de bout en bout, basé sur la construction réelle de **Matoulab.com** (blog chat FR).
> Objectif : pouvoir relancer un nouveau blog dans une autre thématique / langue au **même niveau d'exigence**.
> Coût récurrent par blog : ~**10 €/an** (domaine). Hébergement + outils = gratuits.
> Liens : [[Autoblog - Vue d'ensemble]] · [[Autoblog - Choix des niches]] · [[Autoblog - Monetisation]] · [[Autoblog - Structure SEO et production duplicable]]

---

## 0. Vision & modèle
- **Modèle** : portefeuille de blogs de niche, contenu généré + publié 100 % automatiquement (IA), monétisé par **affiliation + display** (plus tard).
- **Thèse** : chaque blog = petit pari asymétrique (coût ~10 €/an, upside SEO qui compose avec l'âge). On diversifie (thématiques + marchés) et on amplifie les gagnants.
- **Ligne rouge qualité** : PAS de contenu de masse générique (Google pénalise le "scaled content abuse", MAJ mars 2024). On tient la qualité E-E-A-T → c'est ce qui nous garde du bon côté de Google. Voir §11.

## 1. Phase Benchmark & niche (AVANT tout build, 0 dépense)
- Benchmark sourcé des niches candidates : volume, concurrence SERP, potentiel monétisation, **failles** (mots-clés sous-servis).
- Confirmation SEO de la niche retenue : carte de mots-clés longue-traîne à faible concurrence + intention claire, vérifiée en SERP réelle.
- Architecture éditoriale : **4 piliers** thématiques (ex. Matoulab = Comportement / Alimentation / Hygiène-prévention / Choisir-accueillir), chacun avec un cocon d'articles cluster.
- Livrable : doc de niche + backlog priorisé (P1/P2/P3, concurrence/intention/angle).
- **Pour l'international** : refaire ce benchmark PAR marché (DE, SE, EN…) — les failles diffèrent par langue ; c'est là que sont les vraies opportunités.

## 2. Phase Socle technique (0 dépense)
- **Stack** : **Astro SSG** (v4.16) + **Cloudflare Pages** (hébergement gratuit, HTTPS, domaine perso) + **GitHub Actions** (cron de publication).
- Content Collections typées (Zod) : garde-fous E-E-A-T/YMYL **au niveau du build** (un article YMYL sans relecture véto + disclaimer → build échoue).
- Analytics : Cloudflare Web Analytics (cookieless → pas de bandeau) ; trafic zone déjà visible si domaine proxifié Cloudflare.
- Design : gabarits sobres + **infographies SVG de marque** (gradient #7c5cff→#b14bd6, watermark), animation sûre (`opacity:0`+anim SEULEMENT dans `@media (prefers-reduced-motion:no-preference)` sinon rasterizers/preview affichent du vide).

## 3. Phase E-E-A-T & légal
- **Auteur nommé HONNÊTE** (fondateur passionné, PAS un faux vétérinaire). Jamais de faux expert, jamais de contenu véto étranger recopié → [[Autoblog - Modele et positionnement]].
- Santé = **non-diagnostique** : prévention/lifestyle + renvoi systématique au vétérinaire. Zéro stat inventée.
- Pages légales : mentions légales (loi SREN 2024-449), confidentialité RGPD/CNIL, **transparence affiliation** (L.121-3 conso + loi influenceurs 2023-451), disclaimer véto.
- Règle d'écriture : **JAMAIS de tiret cadratin** (— ou –) ; virgules/parenthèses à la place.

## 4. Phase Pipeline de contenu automatisé (le cœur)
Script `prototype/scripts/auto-publish.mjs` — **1 exécution = 1 article complet** :
1. Lit `scripts/topics-queue.json` (file de sujets issue du backlog SEO), prend le 1er slug non existant (dedup).
2. **Texte** via Gemini `gemini-flash-latest` (`responseMimeType:'application/json'`, 4 essais anti-JSON-cassé) → description, coverAlt, tldr, faq[4], intro, sections[], graphic1/2, internalLinks[].
3. **Couverture** via Gemini `gemini-2.5-flash-image` → sharp `resize(1200,630,{fit:'cover',position:'centre'})` (PAS `attention` = coupe le chat) → QC vision anti-coupe (5 essais).
4. **2 infographies SVG** de marque (template `infographic()`).
5. Assemble le `.md` (frontmatter byline honnête + tldr + faq + status:published), corrige liens, ajoute au sommaire du pilier.
6. `npm run build` doit être **vert** avant tout.
7. Deploy `wrangler pages deploy dist` (Cloudflare).
8. Retire le sujet de la file.
- **GEO** (cité par ChatGPT/Perplexity/Google AI) : bloc "Réponse rapide" (tldr) + FAQ → **FAQPage JSON-LD** + BreadcrumbList + Article schema + sources (icatcare/ASPCA). C'est le levier n°1 GEO.
- **Cron** `.github/workflows/publish.yml` : `17 8 * * 1,3,5` (lun/mer/ven) + `workflow_dispatch`. Étape "Vérifier les secrets" auto-diagnostique (écrit ✅/❌ dans `$GITHUB_STEP_SUMMARY`). Re-commit l'article généré (dedup persistée).
- **Réappro file** : quand <6 sujets, relancer une recherche mots-clés.
- Cadence : **3 articles/semaine** (~12/mois). Régularité > rafale. NE PAS balancer en masse sur un domaine jeune.

## 5. Phase Go-live
- **Achat domaine** (seule dépense : ~10 €/an, carte de Rémy — ex. Cloudflare Registrar ou OVH).
- DNS : CNAME `@`→`<projet>.pages.dev` (proxifié) + `www`. (Faisable via token Cloudflare Zone:DNS:Edit.)
- Custom domain ajouté au projet Pages → SSL auto.
- **Indexation** : Google Search Console (propriété Domaine → TXT DNS que j'ajoute → il clique Verify) + soumission `sitemap-index.xml` (URL COMPLÈTE pour une propriété Domaine).
- `robots.txt` autorise explicitement les crawlers IA (GPTBot, PerplexityBot, ClaudeBot, Google-Extended…) + `llms.txt`.

## 6. Phase Monétisation
- **Affiliation** — 1 SEUL compte **Awin Publisher** couvre TOUS les blogs (même Publisher ID = awinaffid). Par nouveau blog : ajouter le site comme "Promotional Space" (2 min) + candidater aux annonceurs.
  - Registre `src/data/affiliates.ts` : partenaires `enabled` + `tracking` (awinaffid) ; `buildAffiliateUrl()` → deep-link `awin1.com/cread.php?awinmid&awinaffid&ued`. Inactif → texte simple (jamais de lien non tracké).
  - Affichage : frontmatter `products:[{partner,url,label,note}]` → encart "Produits conseillés" (ArticleLayout) + **AffiliateDisclosure auto** ; liens `rel="sponsored nofollow noopener"`. (MDX pas installé → passer par le frontmatter, pas de composant dans le `.md`.)
  - Annonceurs animalerie FR (Awin) : **zooplus** (mid 7334), **Maxi Zoo** (68698), Bitiba, **Santévet** (assurance, CPL ~6€, éditorial-only car régulé ORIAS/ACPR).
  - **Amazon** = différé : règle des **3 ventes en 180 j sous peine de fermeture** → ne s'inscrire qu'AVEC du trafic. Commission animalerie ~3% mais énorme catalogue + cookie panier 24h.
- **Display** (plus gros levier sur du trafic info, plus tard) : AdSense (aucun minimum) → Mediavine Journey (1000 sessions/mois) → Raptive (100k pv). À activer quand le trafic est là.

## 7. Phase Mesure & optimisation
- **À 4-8 semaines** : lire Search Console (impressions/clics/positions) → identifier clusters/mots-clés qui montent → **doubler la mise** dessus (plus d'articles, liens affiliés en priorité là où trafic + intention d'achat).
- Rafraîchir les vieux articles (freshness). Ajuster les annonceurs selon ce qui convertit (données Awin).
- *Pourquoi 4-8 sem ?* Uniquement pour DÉCIDER sur données fiables (Google met des semaines à indexer/classer). Ça ne bloque PAS la publication (auto 24/7) ni le lancement d'autres blogs.

## 8. Phase Duplication (usine à blogs)
- **Template repo** + script de provisioning : cloner Matoulab → nouveau blog en quelques minutes (repo, build, deploy, pipeline, légal, design, SEO/GEO hérités).
- Secrets au niveau **organisation** GitHub → plus de recollage par blog.
- Reste incompressible côté humain/blog : payer le domaine (carte) + 2-3 clics d'identité (ajouter site Awin, valider GSC). ~90 % automatisable.
- **International** : 1 benchmark de failles PAR marché avant de builder ; attention à la QC qualité dans une langue qu'on ne lit pas (renforcer la QC auto, relecture native pour YMYL) ; programmes d'affiliation par pays (Awin fort DE/UK ; SE = Adtraction/Awin).

## 9. Taxonomie manuel / unique / automatisable (pour Rémy)
- **Setup UNIQUE (jamais refait)** : compte Cloudflare+token, GitHub, clé Gemini, **compte Awin + Publisher ID**.
- **Par blog, automatisé par moi** : site complet (template), DNS, secrets (org).
- **Incompressible côté Rémy/blog** : payer le domaine (~10€/an, sa carte) + 2-3 clics d'identité.

## 10. Économie réaliste & risques (honnête)
- Un blog isolé = revenu probablement modeste à 1 an (peut ranker et faire des dizaines d'€/mois… ou ~0 s'il ne rank pas). La valeur est dans le **portefeuille** + le **temps** (SEO compose).
- Sur 5 ans : un site mûr avec autorité thématique peut faire nettement plus, MAIS 2 risques structurels : (a) **politiques Google anti-contenu-IA-de-masse** (mitigé par notre qualité), (b) **AI Overviews** qui réduisent le clic sortant sur tout le contenu affilié.
- Ce n'est pas une garantie de gains — c'est un pari de portefeuille à faible coût et fort levier, valable SI on tient la qualité et qu'on diversifie.

## 11. Garde-fous DURS (non négociables)
- **Aucune dépense sans validation Rémy** (domaine = sa carte).
- **Pas de faux expert / faux véto ; santé non-diagnostique + renvoi véto ; sources citées ; zéro stat inventée.**
- Qualité > masse ; jamais de publication en masse sur domaine jeune ; checkpoint humain de QC (peut être moi).
- `rel="sponsored"` sur tout lien affilié + transparence légale. Pas de backlinks dofollow vendus.
- Jamais de tiret cadratin dans le contenu.

## 12. Gotchas techniques (pièges rencontrés, à ne pas refaire)
- **Wrangler exige Node ≥ 22** (Node 20 → deploy échoue). setup-node `node-version: "22"`.
- **Cache-poisoning** : vérifier un asset image sur l'apex AVANT propagation cache le 404 en faux-200. → Vérifier UNIQUEMENT sur `https://<hash>.<projet>.pages.dev`, jamais l'apex ; cache-bust par nom versionné ; `/images/*` max-age=600.
- **Faux-200** : Cloudflare Pages sert la 404/accueil en 200 pour un chemin absent → vérifier le CONTENU (titre), pas le status.
- Cover : prompt "chat ENTIER centré" + crop `position:'centre'` + QC vision anti-coupe.
- Secrets GitHub : étape de diagnostic dans le workflow qui écrit ✅/❌ dans `$GITHUB_STEP_SUMMARY` (visible sur la page Summary sans naviguer).
- Clé de déploiement SSH GitHub = push only (pas d'accès API Actions ; je ne peux pas lire les logs → le step-summary est mon canal).

---
*Dernière MAJ : 2026-07-14. Source de vérité opérationnelle = repo `Remy-authority/matoulab` (`autoblog-chat/`) + docs/01→14.*
