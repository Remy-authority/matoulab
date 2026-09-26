# Leçons du dépôt (digest, une ligne par règle)

- 27/09/2026 : une vérification « répond 200 » ne prouve rien. reptilab.pages.dev appartient à un AUTRE site (Terra Keeper) et répondait 200 en HTML pour notre image. Toute vérification en ligne lit un marqueur propre (titre de l'article, type image/webp) sur le sous-domaine réel du projet, relevé dans la sortie de `wrangler pages deploy`.
- 27/09/2026 : `new URL(..., import.meta.url).pathname` garde les `%20` : sur le Mac (dossier avec espaces), le robot voyait un stock vide et créait un faux dossier. Toujours `fileURLToPath`.
- 27/09/2026 : Gemini ne fabrique plus d'images en offre gratuite (limite 0). Tester la génération d'image elle-même, jamais seulement la liste des modèles.
- 27/09/2026 : une photo générée se REGARDE avant d'être gardée. La tortue passée au contrôle automatique au 3e essai ressemblait à une sculpture. Pour une espèce précise, la consigne décrit ce qui la distingue (carapace bombée jaune et noire), pas seulement son nom.
- 27/09/2026 : les brouillons ne vont sur main qu'après le GO de publication. Le robot publie le premier brouillon qu'il y trouve ; avant le GO, ils attendent sur une branche.
