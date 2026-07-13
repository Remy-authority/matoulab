# 13 — Pipeline de publication automatisé (Matoulab)

But (demande Rémy 2026-07-13) : **création + programmation + automatisation à 100 %** de
la production d'articles, ~**3/semaine (12/mois)** pendant **au moins 1 an** (~144
articles), sans intervention manuelle. Ce doc est la SPEC que l'agent planifié suit à
chaque exécution.

## Cadence

- Déclenchement : **3 fois par semaine** (lun / mer / ven), via une routine planifiée
  (cron). 1 article par exécution = 12/mois.
- 12/mois est une cadence **saine et durable** (ce n'est pas de la production de masse ;
  le risque Google vient des bursts + de la faible qualité, pas d'un rythme régulier de
  qualité).

## Ce que fait l'agent à CHAQUE exécution (1 article)

1. **Choisir le sujet** : lire `docs/12-backlog-seo-priorise.md`, prendre le prochain
   sujet **non produit**, par priorité (P1 > P2 > P3). **Vérifier l'absence de doublon**
   avec les articles existants (`src/content/articles/`) ; si chevauchement, sauter ou
   re-angler. Ne jamais republier un sujet déjà couvert.
2. **Couverture** : ajouter le slug + une scène (photo naturelle, chat centré, pas de
   props trop spécifiques) dans `scripts/gen-covers.mjs`, lancer la génération
   (`GEMINI_API_KEY` récupérée du fil de l'issue AUT-5), qui inclut le **QC anti-coupure**.
   Vérifier l'image à l'œil (Read) avant de continuer.
3. **2 infographies de marque** : SVG, style Matoulab (dégradé `#7c5cff→#b14bd6`, accent
   `#c98a4b`, mention `matoulab.com`, animation robuste `@media (prefers-reduced-motion:
   no-preference)` avec contenu visible par défaut).
4. **Article** : frontmatter complet (title, description, pillar, kind:cluster, cover,
   coverAlt, clusterParent, author = Rémy Zaoui fondateur, updatedAt, ymyl:false,
   medLevel:none, disclaimer:false, affiliate:false, **tldr**, **faq** 4 Q/R, status:
   published). Corps **~700 mots**, sources (icatcare/ASPCA), maillage interne, les 2
   infographies placées dans le contenu. Ajouter le lien au « Dans ce guide » du pilier.
5. **Contrôle qualité** : `grep` pour **0 tiret cadratin** ; `npm run build` doit être
   **vert** avant tout déploiement (si le build casse, NE PAS déployer, s'arrêter et
   loguer).
6. **Déployer** : `wrangler pages deploy dist` avec le token CF (`cfut_...` du fil de
   l'issue) + account `2edbbf024d9440e907f5fd74d174d0d3`.
7. **Vérifier** : uniquement sur l'URL technique `*.pages.dev` (JAMAIS l'apex, pour ne
   pas empoisonner le cache) : page 200, cover `image/webp`, infographies `image/svg+xml`.
8. **Journaliser** : marquer le sujet produit dans `docs/12` (section Suivi), et poster un
   commentaire court sur l'issue AUT-5 (1-2 lignes).

## Réapprovisionnement du backlog (topics ne doivent pas s'épuiser)

- Si le backlog `docs/12` compte **moins de 6 sujets non produits**, lancer une **recherche
  mots-clés** (sous-agent, WebSearch/SERP réel) pour ajouter ~10 nouveaux sujets longue
  traîne peu concurrentiels, non redondants, priorisés. Sourcing strict, pas d'invention.

## Garde-fous DURS (non négociables, même en auto)

- **Aucune dépense** : on reste sur la stack gratuite (Astro + Cloudflare Pages). Ne
  jamais acheter/engager quoi que ce soit.
- **E-E-A-T** : jamais de faux expert/vétérinaire ; santé = prévention/lifestyle
  **non-diagnostique** + renvoi vétérinaire ; sources citées ; pas de stats inventées.
- **Pas de doublon** : dédup obligatoire vs l'existant.
- **Qualité** : si un sujet ne peut pas donner un article vraiment utile et distinct, le
  sauter plutôt que produire du remplissage.

## Conditions d'ARRÊT / d'alerte (l'agent le signale à Rémy)

- Clé Gemini ou token Cloudflare **invalide/expiré** → pause + alerte (secret à
  renouveler par Rémy).
- Backlog épuisé **et** la recherche ne trouve plus de sujet distinct de qualité → on ne
  force pas, on alerte (le puits de sujets « chat » de qualité n'est pas infini).
- Build cassé non réparable → pause + alerte.

## Limites honnêtes (dites à Rémy)

- **Dépendances vivantes** : le pipeline tient tant que (a) la clé Gemini, (b) le token
  Cloudflare, (c) le runtime planifié restent valides sur l'année. Un secret révoqué =
  pause.
- **Puits de sujets fini** : ~144 articles « chat » de qualité, vraiment distincts, en un
  an, c'est ambitieux ; vers 60-80, les sujets deviennent plus pointus. On privilégie la
  qualité au comptage : mieux vaut 100 excellents que 144 dilués.
- **Un coup d'œil humain occasionnel reste recommandé** (pas obligatoire) : Google
  sanctionne la production de masse non surveillée. La cadence régulière + la qualité +
  la dédup limitent le risque, mais une relecture de temps en temps est un filet.
