# Format d'un brouillon (Matoulab et Reptilab, 27/09/2026)

Un brouillon = `content/drafts/NN-slug.md` à la RACINE du dépôt (jamais sous `prototype/src/content/`,
sinon Astro le construit en page publique). `NN` = rang de publication (01 à 39, `tasks/mots-cles/ordre.txt`).
Le robot `prototype/scripts/auto-publish.mjs` prend le plus petit NN, fabrique la couverture et les
2 schémas, complète le frontmatter, déplace le fichier vers `prototype/src/content/articles/slug.md`,
construit, déploie. Tout champ ci-dessous est OBLIGATOIRE sauf mention.

```yaml
---
title: "Titre exact de tasks/todo.md (peut être poli, garde la requête Google)"
description: "Meta description, 120 à 155 caractères, contient la requête"
pillar: <une des 4 rubriques du site, sans accent>
keyword: "requête Google visée (colonne Requête de tasks/todo.md)"
coverScene: "Consigne photo COURTE en anglais (25 mots max), 1re phrase = la scène finie et nette : l'animal ENTIER, centré, dans un décor soigné et moderne. Aucune négation, aucun texte."
coverAlt: "Description française de la photo attendue (une phrase)"
products:                      # 1 rayon Maxi Zoo, celui de tasks/todo.md (0 si hors sujet : écrire products: [])
  - partner: maxizoo
    url: "https://www.maxizoo.fr/c/..../"
    label: "Libellé du lien (ex. : Voir les arbres à chat sur Maxi Zoo)"
    note: "Une phrase utile, jamais un faux avis ni une promesse"
tldr: "Réponse rapide, 3 ou 4 phrases, se suffit à elle-même (citée par les IA)"
faq:                           # exactement 4 questions, réponses de 2 ou 3 phrases
  - q: "..."
    a: "..."
graphics:                      # 2 schémas rendus en SVG par le robot
  g1:
    title: "Titre du schéma 1 (50 caractères max)"
    points:                    # exactement 4, format "Mot-clé: explication"
      - "Mot-clé court: explication de 44 caractères max"
  g2:
    title: "..."
    points: ["...", "...", "...", "..."]
---
```

Corps (700 à 1 000 mots hors frontmatter) :
1. Intro de 2 ou 3 phrases, puis la ligne `{{g1}}` seule.
2. 4 ou 5 sections `## ...` (titres qui répondent à une vraie question) ; la ligne `{{g2}}` seule après la 3e section.
3. Une phrase de maillage vers 1 ou 2 articles DÉJÀ PUBLIÉS (liste `prototype/src/content/articles/`) ou la page rubrique : `[texte](/slug)`. Jamais vers un autre brouillon.
4. `## Pour aller plus loin (sources)` : 2 ou 3 sources RÉELLES, lues pendant la rédaction, en liste `- **Nom** : [domaine](https://url-exacte)`.
5. Dernière ligne, en italique : Matoulab `*Ce guide est informatif et ne remplace pas l'avis d'un vétérinaire.*` ; Reptilab `*Ce guide est informatif et ne remplace pas l'avis d'un vétérinaire NAC.*`

Limites mesurables : `g1/g2.points` « Mot-clé » 26 caractères max, explication 44 caractères max ;
titre 70 caractères max ; zéro tiret long ou demi-cadratin (— –) ; apostrophes droites ' partout.

Interdits : chiffre vétérinaire, d'élevage, de température, de durée de vie ou de prix SANS la source nommée
dans la phrase (sinon pas de chiffre) ; posologie ou nom de médicament conseillé ; diagnostic ; personne fictive,
témoignage, faux avis, « nos lecteurs » ; « je » ; formule de conclusion toute faite (« En résumé », « En conclusion »,
« N'hésitez pas ») ; lien vers un site rank & rent ; affirmation réglementaire non vérifiée sur le texte officiel.
Au doute sur la santé : « demandez à votre vétérinaire ».
