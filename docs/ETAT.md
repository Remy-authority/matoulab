# ÉTAT : matoulab.com (mis à jour le 27/09/2026, CEO affiliation)

## En une phrase
Autoblog relancé le 27/09/2026 : 38 brouillons en stock dans `content/drafts/`, publiés seuls 3 fois par semaine (lundi, mercredi, vendredi 08:17 UTC) jusqu'au 23/12/2026.

## Comment ça marche
- Robot : `prototype/scripts/auto-publish.mjs` (IDENTIQUE dans les dépôts matoulab et reptilab), lancé par `.github/workflows/publish.yml`.
- À chaque passage : premier brouillon `NN-slug.md`, couverture fal.ai FLUX dev 1280x720 (+ contrôle Gemini, 4 essais), 2 schémas SVG signés matoulab.com, build Astro, déploiement Cloudflare Pages (envoi direct : pousser sur GitHub ne publie rien), vérification en ligne sur matoulab.pages.dev (titre de l'article + couverture webp), journal `tasks/journal-publication.tsv`, commit.
- Stock vide : avertissement clair, code 0, rien publié. Stock ≤ 6 : avertissement.
- Commandes utiles, depuis `prototype/` :
  - `CHECK=1 node scripts/auto-publish.mjs` : contrôle de tout le stock (format, longueurs, liens, répétitions entre brouillons). Verdict attendu « N/N brouillons conformes ».
  - `DRYRUN=1 FAL_KEY=… node scripts/auto-publish.mjs` : essai à blanc complet (1 image payée), rien publié.
  - GitHub Actions > publish.yml > Run workflow : `dryrun=1` essai à blanc ; `deployonly=1` remise en ligne sans nouvel article (après une retouche à la main).
- Secrets du dépôt (vérifiés le 27/09, `gh secret list`) : FAL_KEY, GEMINI_API_KEY, CLOUDFLARE_API_TOKEN.

## Faits du 27/09/2026
- Panne d'août : file de sujets vide (`exit 2`), et le workflow Matoulab avait été désactivé à la main (réactivé).
- Gemini : texte OK, IMAGES MORTES (quota gratuit à 0, clé locale et clé du dépôt). Couvertures désormais par fal.ai (~0,025 $ l'image).
- 39 sujets mesurés (DataForSEO, `tasks/mots-cles/`), 39 brouillons écrits en 3 lots, relecture à froid Opus (chiffres vérifiés à la source), CHECK=1 39/39.
- Premier article publié le 27/09 : https://matoulab.com/vermifuger-chat/ (run vert, titre et couverture vérifiés).
- Corrigés : apostrophes de 7 articles, lien « Retour au guide » et fil d'Ariane (nom lisible de la rubrique).
- Rank OS : fiche `matoulab` (repo matoulab.com, autoblog 3/semaine, fin 23/12/2026, entrée travaux, capture).

## À surveiller
- Solde fal.ai partagé avec tout le portefeuille (14 $ le 27/09) : sous 2 $, le robot s'arrête sans publier.
- Le contrôle Gemini des couvertures peut être indisponible (503) : la couverture passe alors sans contrôle ; la regarder dans le journal des publications.
- Anciens scripts inutilisés : `gen-covers.mjs`, `gen-gemini-images.mjs`, `topics-queue.json` (plus lus par le robot).
- Prochaine recharge : écrire de nouveaux brouillons avant le 23/12/2026 (même format : `tasks/format-brouillon.md`).
