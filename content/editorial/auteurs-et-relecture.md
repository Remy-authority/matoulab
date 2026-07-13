> **BROUILLON — à faire valider par un humain / conseil juridique avant mise en ligne ; ceci n'est pas un avis juridique.**
> Rédigé le 2026-07-11 pour **matoulab.fr**. Complète la [charte E-E-A-T](./charte-eeat.md) et le composant `AuthorBox.astro` / `VetReview.astro` (livrable 3).

# Auteurs & relecture — cadre E-E-A-T

## Principe intangible

**E-E-A-T exige des personnes réelles.** On **ne fabrique jamais** d'auteur, de diplôme, de titre ou de vétérinaire. Toute bio doit être **véridique et vérifiable**. Un faux vétérinaire relecteur exposerait en plus au grief d'exercice illégal / de pratique trompeuse.

## 1. Structure d'une bio auteur (page auteur + `AuthorBox`)

- **Nom réel** (ou prénom + initiale assumé publiquement) : `[[À DÉSIGNER : auteur réel nommé]]`
- **Photo réelle** (recommandée pour le Trust) : `[[À COMPLÉTER]]`
- **Expérience réelle avec les chats** : années d'expérience, nombre de chats, contexte (famille d'accueil, refuge, éleveur, propriétaire de longue date…). **Décrire l'expérience vécue, pas des diplômes qu'on n'a pas.**
- **Domaines de prédilection** : comportement, alimentation, adoption, etc.
- **Ce qu'on N'écrit PAS** : aucun titre professionnel non détenu (« vétérinaire », « comportementaliste certifié », « nutritionniste ») sans justificatif réel.
- **Liens** : page auteur interne + éventuels profils publics réels.
- **Mention IA (transparence)** : `[[À TRANCHER : indiquer ou non que certains contenus sont assistés par IA puis revus par l'auteur nommé. Recommandé pour le Trust.]]`

**Gabarit :**
> **[Prénom Nom]** — passionné(e) de chats depuis [X] ans, [contexte réel]. Écrit sur [thèmes]. Les articles santé sont relus par un vétérinaire (voir ci-dessous).

## 2. Rôle du relecteur vétérinaire (YMYL)

- Un **vétérinaire réel** relit **toute page santé/MED** avant publication : vérifie l'exactitude, corrige, valide.
- Il **n'écrit pas nécessairement** l'article ; il en **valide le contenu médical**.
- Sa relecture est matérialisée par l'encadré ci-dessous + les champs JSON-LD `reviewedBy` / `lastReviewed`.
- **Sans vétérinaire relecteur engagé, la rubrique santé/MED ne s'ouvre pas** (règle AUT-3).

**Encadré « Relu par » (composant `VetReview.astro`) :**
> ✅ **Relu par [[À SÉCURISER : Dr [Nom], vétérinaire]]** — `[[À COMPLÉTER : n° d'inscription à l'Ordre des vétérinaires, le cas échéant]]`.
> Dernière revue le `[[À COMPLÉTER : date]]`.

> ⚠️ Ne jamais afficher cet encadré sans relecture réelle par le vétérinaire nommé, à la date indiquée.

## 3. Cohérence avec le reste du pack

- La signature auteur alimente les [mentions légales](../legal/mentions-legales.md) (directeur de publication ≠ forcément auteur).
- Le disclaimer et la règle « pas de diagnostic » : voir [disclaimer vétérinaire](../legal/disclaimer-veterinaire.md).

---

## DÉCISIONS que l'humain (Rémy) doit trancher

1. **Auteur réel** — `[[À DÉSIGNER]]` : qui signe les articles ? Rémy lui-même, un rédacteur salarié/freelance nommé, ou l'équipe Auto Blog IA sous un nom réel ? **Un persona fictif est exclu.** Décider aussi de la mention « contenu assisté par IA ».
2. **Relecteur vétérinaire réel** — `[[À SÉCURISER]]` : comment l'obtenir ?
   - Option A : **freelance** vétérinaire à la relecture (à l'article ou au forfait).
   - Option B : **partenariat** avec une clinique / un vétérinaire (visibilité contre relecture).
   - Option C : **reporter/ne pas ouvrir la rubrique MED** tant qu'aucun vétérinaire n'est engagé (démarrage sur piliers non-MED — conforme AUT-3).
   - → **Dépense éventuelle à valider par Rémy** (la relecture véto est le seul poste qui peut coûter ; tout le reste du pack est à coût 0).
3. **Cadence de revue** du contenu YMYL (ex. 12 mois) et **canal de correction** (e-mail).
4. **Identité éditeur / directeur de publication / hébergeur** : voir placeholders des mentions légales — à renseigner avec des données réelles avant mise en ligne.

---

*Document interne. À compléter avec des personnes réelles avant toute publication santé.*
