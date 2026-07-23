# Diagnostic AUT-26 — Plateau de génération (07-16 → 07-21)

_Auteur : Founding Engineer. Date : 2026-07-21. Diagnostic UNIQUEMENT — aucun article publié, aucun déploiement, aucune dépense._

## Verdict en une ligne
La génération n'a **jamais** dépendu de mes runs de heartbeat. Elle tourne via un **cron GitHub Actions autonome**. Le plateau = ce cron ne publie plus depuis son dernier run réussi (matoulab 07-17, reptilab 07-16), alors que **la file de sujets n'est pas vide** et **le script n'a pas d'erreur**. La cause restante est **dans l'exécution GitHub Actions** (secret/quota), non observable depuis mon environnement.

## L'hypothèse (a) de la CEO est réfutée
Hypothèse CEO : « tes 15 issues sont `done` → plus rien ne te réveille → génération arrêtée ».
Preuves du contraire :
- Le mécanisme de publication est `.github/workflows/publish.yml` :
  - **matoulab** : cron `17 8 * * 1,3,5` (lun/mer/ven ~08:17 UTC)
  - **reptilab** : cron `37 8 * * 2,4,6` (mar/jeu/sam ~08:37 UTC)
  100 % autonome sur GitHub Actions — n'a besoin d'aucun de mes runs.
- Les articles sont committés par `matoulab-bot <bot@matoulab.com>` / `reptilab-bot <bot@reptilab.fr>`, aux **timestamps UTC des runners**, exactement sur la cadence cron : matoulab 07-13 / 07-15 / 07-17 ; reptilab 07-15 / 07-16.
- Mes commits à moi (`Matoulab Autoblog <remy@remyzaoui.com>`, timestamps +0800) sont **structurels** (affiliation, layout, pages légales) — **jamais** des « auto: nouvel article publie ».

→ Conséquence pratique : **me ré-assigner une cadence de contenu ne relancerait PAS la publication** des sites, et ne réglerait rien si la cause est un quota. Le mécanisme compte.

## Ce que j'ai vérifié (local, sans rien publier ni dépenser)
1. **Mécanisme = cron GitHub Actions** (ci-dessus). ✔
2. **File de sujets NON épuisée** : matoulab **8** sujets restants (`gamelle-anti-glouton`, `adopter-chat-appartement`, …) ; reptilab **13** (`axolotl-pour-débuter-aquariophilie`, …). → l'`exit 2` « file épuisée » du script est **exclu**. ✔
3. **Script `auto-publish.mjs`** : `node --check` OK sur les deux repos. La dernière modif (07-17, commit `b6e797e`, bloc affiliation Maxi Zoo, +13 lignes) est du string-building bénin, pas de bug d'exécution évident. ✔
   - Nuance : je ne peux pas le dry-run à 100 % — `DRYRUN=1` appelle quand même Gemini, et je n'ai pas la clé en local.
4. **Live confirmé stuck** : `curl sitemap-0.xml` → matoulab **44** URLs, reptilab **48** URLs, HTTP 200. Plateau réel. ✔
5. **Runs réellement manqués** (calibrage) : matoulab a manqué **un seul** run (lun 07-20 ; prochain mer 07-22) ; reptilab a manqué sam 07-18 (mardi 07-21 encore à venir à l'heure du diag). Peu de runs, mais **deux crons différents s'arrêtent dans la même fenêtre** → cause commune probable, pas du hasard de planification.

## Ce que je NE peux PAS vérifier depuis mon environnement (limites honnêtes)
- **Aucun accès GitHub** : pas de `gh` CLI, SSH host-key refusé, HTTPS sans identifiants. → impossible de lire l'historique/les logs des runs Actions ni la page « Summary » du diagnostic secrets.
- Les secrets `GEMINI_API_KEY` / `CLOUDFLARE_API_TOKEN` n'existent **que** dans les secrets GitHub, **pas** en local. → impossible de tester si l'un est expiré/épuisé. **Je refuse d'inventer un message d'erreur.**

## Réponse aux 3 questions de l'issue
1. **La génération dépendait-elle de mes runs de heartbeat ?** → **NON**. Cron GitHub Actions autonome. Hypothèse (a) réfutée.
2. **État de la chaîne (sans publier/dépenser)** → file **OK**, script **OK**, live **stuck**. Le point de défaillance est **dans l'exécution GitHub Actions** (post-07-17), non observable d'ici. Je ne peux pas nommer le token exact ni citer le message d'erreur exact sans accès GitHub — l'affirmer serait de l'invention.
3. **Cause la plus probable** → **(b)** un **secret refusé / quota Gemini free-tier épuisé** : le workflow a justement une étape « Verifier les secrets » qui fait `exit 1` **avant** de publier si Gemini renvoie ≠ 200 ou si le token Cloudflare n'est pas `active`. Cohérent avec l'interaction **5af3ac68** déjà ouverte. **À CONFIRMER** — voir action ci-dessous.

## Plus petite action pour obtenir la cause EXACTE et relancer (à faire par Rémy)
GitHub → repo **matoulab** (puis **reptilab**) → onglet **Actions** → workflow « auto-publish » → **Run workflow** (`workflow_dispatch`).
Le workflow écrit **lui-même** le verdict sur la page **Summary** du run :
- quel secret est ❌ **avec le code HTTP exact** (cas secret/quota) ; **ou**
- les 25 dernières lignes du log de génération si ça casse après les secrets.

→ 2 minutes, verdict exact, et **si les secrets sont ✅ ça republie du même coup**.
⚠️ Ceci **est** une action de déploiement/publication → **gatée sur ta validation**. Je ne la déclenche pas (et je n'ai pas les accès GitHub).

## Note quota Gemini free-tier (contexte, pas une dépense)
Le pipeline utilise `gemini-flash-latest` (texte) + `gemini-2.5-flash-image` (image) en **offre gratuite**. Le free tier a des quotas jour/minute ; s'ils sont épuisés → HTTP 429 → le run échoue sans publier. La remise à zéro est **quotidienne et gratuite** ; une nouvelle clé gratuite est aussi possible. À confirmer par le Summary **avant** toute action.
