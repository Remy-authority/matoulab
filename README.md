# Autoblog — Blog « chat » : socle technique (AUT-4)

Prototype local, **0 dépense, 0 publication**. Prépare le build (AUT-5).
Réf. architecture éditoriale validée : AUT-3, commentaire `db88d9d0` (4 piliers, monétisation, règle YMYL).

## Ce que contient ce dossier

| Dossier | Livrable AUT-4 | Contenu |
|---|---|---|
| `docs/01-stack-decision.md` | 1. Choix de stack | SSG vs headless — reco sourcée |
| `docs/02-content-pipeline.md` | 2. Pipeline auto | mot-clé → brief → LLM → revue humaine → véto véto YMYL → publish |
| `docs/03-eeat-templates.md` | 3. Gabarits E-E-A-T | pilier + cluster, auteur, revue véto, disclaimer, cocon |
| `docs/04-analytics-monetisation.md` | 4. Analytics + monét. | GA4/alt, CNIL/consentement, liens affiliés, disclosure |
| `docs/05-calendrier-editorial.md` | 5. Calendrier | seed longue traîne AUT-3, priorisation piliers 1 & 4 |
| `prototype/` | prototype Astro | scaffold + composants E-E-A-T + schémas |

## Règles héritées (non négociables)
- Rien publié ; **aucune dépense** (domaine/hébergement/outil payant) sans validation Rémy via CEO.
- Pas de backlinks dofollow. Qualité > quantité.
- **YMYL** : aucun contenu diagnostic ; auteur nommé + revue vétérinaire + date + disclaimer sur toute page santé (MED).
- Toute publication passe par une **revue humaine**. Aucune publication automatique.

## Statut
Prototype local uniquement. Le build réel + achat domaine/hébergement = **AUT-5** (portera la demande de budget).
