# Livrable 3 — Gabarits E-E-A-T + cocon sémantique

Objectif : matérialiser les signaux **E-E-A-T** (Experience, Expertise, Authoritativeness, Trust) que Google attend, en particulier sur un sujet à composante YMYL (santé animale). Réf. Google : [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (consulté 2026-07-11).

## Composants implémentés (dossier `prototype/src/components/`)

| Composant | Signal E-E-A-T | Où / quand |
|---|---|---|
| `AuthorBox.astro` | **Authoritativeness** — auteur nommé + lien vers page auteur + JSON-LD `Person` | Toutes les pages |
| `VetReview.astro` | **Expertise/Trust** — « révisé par un vétérinaire » nommé + date de revue + `reviewedBy` JSON-LD | Pages santé (MED) uniquement |
| `UpdatedDate.astro` | **Trust/Freshness** — date de mise à jour visible + `dateModified` | Toutes les pages |
| `Disclaimer.astro` | **Trust/YMYL** — « ne remplace pas une consultation vétérinaire » | Pages santé (MED) |
| `AffiliateDisclosure.astro` | **Trust** + obligation légale FR | Pages avec liens affiliés |
| `AffiliateLink.astro` | conformité Google — `rel="sponsored nofollow"` | Chaque lien affilié |

## Gabarits de page (dossier `prototype/src/layouts/`)

### Page PILIER (`PilierLayout.astro`) — tête de cocon
Hub thématique long qui **maille vers tous ses clusters**. Contient : H1, date MAJ, bloc auteur, (disclaimer si MED), corps, puis section « Dans ce guide » listant les articles enfants. C'est la page qui vise le mot-clé de tête du pilier et concentre l'autorité.

### Article CLUSTER (`ArticleLayout.astro`)
Article longue traîne. Ordre des blocs = **garde-fous d'abord** : date MAJ → auteur → (revue véto si MED) → (disclosure si affilié) → (disclaimer si MED) → corps → **lien remontant vers la page pilier** (cocon). Émet un JSON-LD `Article`/`MedicalWebPage` avec `author`, `dateModified`, et `reviewedBy`+`lastReviewed` si revue véto.

## Cocon sémantique / maillage interne (les 4 piliers d'AUT-3)

Structure en **silo** : 1 page pilier par thème, N articles cluster qui pointent vers leur pilier (et le pilier pointe vers eux). Maillage latéral entre clusters d'un même pilier quand pertinent.

```
Accueil
├── PILIER 1 — Comportement & éducation      (non-MED, moteur de trafic display)
│     ├── chat qui miaule la nuit
│     ├── pourquoi mon chat griffe le canapé
│     └── comprendre le langage du chat
├── PILIER 2 — Alimentation                   (long-tail + calculateur de ration)
│     ├── combien nourrir un chat (calculateur)
│     └── croquettes chaton : comment choisir
├── PILIER 3 — Choisir & accueillir           (lifestyle-match, pas de fiche race isolée)
│     ├── quel chat pour un appartement
│     └── kit de démarrage adoption chaton
└── PILIER 4 — Hygiène & prévention SÛRE       (litière/toilettage/senior = revenu ; MED = véto)
      ├── meilleure litière pour chat          (non-MED, affilié)
      ├── comment nettoyer les yeux de son chat (non-MED)
      └── [MED] antiparasitaire chat            (YMYL → véto + disclaimer OBLIGATOIRES)
```

**Règle de sécurité (héritée AUT-3)** : le démarrage attaque Piliers 1 → 3 → 4-non-MED. Les pages **MED** (santé/traitement) n'entrent qu'une fois un **vétérinaire relecteur** engagé (dépense à valider par Rémy). Le typage (`content.config.ts`) empêche techniquement de publier une page MED sans revue véto.

## Exemples concrets fournis
- `prototype/src/content/piliers/comportement.md` — page pilier exemple (non-MED).
- `prototype/src/content/articles/chat-qui-miaule-la-nuit.md` — cluster exemple avec frontmatter complet + maillage.
- `prototype/src/content/articles/exemple-page-med.md` — exemple de page MED montrant les champs `vetReview`+`disclaimer` requis.
