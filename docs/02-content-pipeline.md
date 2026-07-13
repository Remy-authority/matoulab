# Livrable 2 — Pipeline de contenu automatisé (avec garde-fous)

**Principe non négociable : aucune publication automatique.** L'automatisation produit des *brouillons* ; un humain approuve, et un vétérinaire a un **droit de véto** sur toute page santé (MED/YMYL). Réf. règle YMYL : AUT-3 `db88d9d0`.

## Schéma du flux

```
[1] MOT-CLÉ            (seed longue traîne AUT-3 ; volumes affinés Google Keyword Planner — gratuit)
      │  file d'attente = pipeline/keyword-queue.csv  (statut: queued)
      ▼
[2] BRIEF             (généré : intention SERP, angle, plan Hn, entités, questions PAA,
      │               pilier + page pilier de rattachement, cible mots, liens internes cibles,
      │               flag YMYL ? → si oui, exige revue véto en aval)
      │  schéma = pipeline/brief-schema.json
      ▼
[3] GÉNÉRATION LLM    (rédaction depuis le brief ; Claude. Sources citées, pas d'invention ;
      │               ton E-E-A-T ; frontmatter pré-rempli : author, updatedAt, ymyl, medLevel)
      │  sortie = src/content/... en statut `draft`
      ▼
[4] REVUE HUMAINE     ◄── GATE 1 (obligatoire, toujours). Éditeur : exactitude, ton, factualité,
      │               anti-thin-content, maillage interne. Corrige/renvoie. Statut → `in_review`.
      ▼
[4b] VÉTO VÉTÉRINAIRE ◄── GATE 2 (obligatoire SI ymyl/medLevel=MED). Un vétérinaire nommé
      │               relit, corrige, appose sa revue (vetReview). Peut BLOQUER. Statut → `vet_review`→`approved`.
      │               ► Sans vetReview + disclaimer, le BUILD ÉCHOUE (content.config.ts superRefine).
      ▼
[5] PUBLICATION       (merge de la Pull Request Decap CMS par un humain → build Astro → deploy).
                       Statut → `published`. Aucune étape n'est déclenchée sans action humaine.
```

## Où l'automatisation s'arrête (garde-fous)

| Étape | Automatisé ? | Contrôle humain |
|---|---|---|
| Sélection mot-clé | Semi (seed AUT-3 + Keyword Planner) | Priorisation validée (calendrier, livrable 5) |
| Brief | Oui (LLM depuis schéma) | Éditeur peut réécrire |
| Rédaction | Oui (LLM) | — |
| **Publication** | **Jamais auto** | **Gate 1 humain systématique** |
| **Pages santé (MED)** | — | **Gate 2 véto obligatoire ; véto peut bloquer** |
| Disclaimer / disclosure | Injecté par gabarit | Vérifié en revue |

## Garde-fous techniques (implémentés dans le prototype)
1. **Blocage au build** : `content.config.ts` (Zod `superRefine`) refuse de construire une page `ymyl/MED` sans `vetReview` **et** `disclaimer`. Le garde-fou n'est pas qu'un process — il est *dans le code*.
2. **Machine à états** : `status` ∈ {draft → in_review → vet_review → approved → published}. Une page ne passe `published` que via merge PR humain (Decap editorial workflow).
3. **Zéro invention** : le prompt LLM impose des sources vérifiables ; l'éditeur retire toute affirmation non sourçable (règle maison, cohérente avec la mission).
4. **Anti-thin-content** : brief impose une valeur ajoutée réelle (expérience, comparatif, données) ; qualité > quantité. Un article faible est rejeté en Gate 1, pas publié.

## Rôles humains (à staffer plus tard — pas de recrutement autorisé maintenant)
- **Éditeur/relecteur** (Gate 1) : au départ = Rémy ou l'ingénieur fondateur.
- **Vétérinaire relecteur** (Gate 2) : prestataire nommé, rémunéré à la revue — **dépense → à valider par Rémy via CEO** au moment du build santé. Tant qu'aucun véto n'est engagé, **on ne publie pas de page MED** (on démarre par Pilier 1 comportement, non-MED — voir livrable 5).

*Le calendrier (livrable 5) priorise volontairement des sujets NON-MED au démarrage pour ne pas dépendre du véto avant d'avoir l'autorité et le budget.*
