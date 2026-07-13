> **BROUILLON — à faire valider par un humain / conseil juridique avant mise en ligne ; ceci n'est pas un avis juridique.**
> Rédigé le 2026-07-11 pour **matoulab.fr**. Prolonge le livrable 3 (gabarits E-E-A-T : `AuthorBox`, `VetReview`, `UpdatedDate`, `Disclaimer`, `AffiliateDisclosure`).

# Charte éditoriale E-E-A-T — matoulab.fr

## Cadre de référence Google

- **« Creating helpful, reliable, people-first content »** (contenu utile, fiable, centré sur les personnes) : https://developers.google.com/search/docs/fundamentals/creating-helpful-content (accédé 2026-07-11).
- **E-E-A-T** = Experience, Expertise, Authoritativeness, Trust ; le **Trust** est central et le **YMYL** (santé, dont la santé animale) exige le niveau de fiabilité le plus élevé — Google Search Quality Rater Guidelines : https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t (accédé 2026-07-11).

Cette charte traduit ces attentes en règles concrètes, opposables à toute production de contenu (humaine ou assistée par IA puis revue).

## 1. Experience & Expertise — auteurs réels

- **Tout article est signé par un auteur réel, nommé**, avec une **bio** et une page auteur dédiée (composant `AuthorBox.astro`, JSON-LD `Person`).
- La bio met en avant l'**expérience réelle** (années à s'occuper de chats, terrain, spécialité) — voir [auteurs-et-relecture.md](./auteurs-et-relecture.md).
- **Interdiction absolue d'inventer un auteur, un diplôme ou un titre.** Pas de personas fictifs, pas de faux vétérinaire, pas de faux « expert ». Cf. règles E-E-A-T (les personnes doivent être réelles et vérifiables).
- Le contenu peut être **assisté par IA** mais est **relu, corrigé et validé par un humain nommé** qui en assume la responsabilité éditoriale.

## 2. Authoritativeness — relecture vétérinaire obligatoire sur le YMYL

- **Toute page santé / MED** (symptômes, maladies, traitements, antiparasitaires, alimentation médicale…) est **relue par un vétérinaire réel** avant publication, avec encadré **« Relu par [Dr X, vétérinaire] »** + date de revue (composant `VetReview.astro`, JSON-LD `reviewedBy` / `lastReviewed`).
- **Sans relecteur vétérinaire réel engagé, aucune page MED n'est publiée** (garde-fou technique `content.config.ts`, hérité d'AUT-3).
- **Aucun diagnostic, aucune prescription** ne sont formulés (voir [disclaimer vétérinaire](../legal/disclaimer-veterinaire.md) et Code rural art. L.243-1).

## 3. Trust — sourcing & vérifiabilité

- Les affirmations de santé/nutrition s'appuient sur des **sources fiables** (études, autorités vétérinaires, publications de référence), **citées et liées**.
- Pas d'affirmation médicale non sourcée. En cas d'incertitude, on écrit « demandez à votre vétérinaire » plutôt que d'affirmer.
- Les recommandations produits reposent sur des **critères explicités**, indépendants des commissions d'affiliation.

## 4. Datation & fraîcheur

- Chaque page affiche une **date de publication** et une **date de dernière mise à jour** (`UpdatedDate.astro`, `dateModified`).
- Les pages santé affichent en plus la **date de dernière revue vétérinaire**.
- Le contenu YMYL est **réexaminé périodiquement** — `[[À COMPLÉTER : cadence de revue, ex. tous les 12 mois ou à chaque évolution des recommandations]]`.

## 5. Politique de correction

- Les erreurs signalées sont **corrigées rapidement** ; une correction substantielle est **datée et signalée** (note de mise à jour en bas d'article).
- Canal de signalement : `[[À COMPLÉTER : e-mail de contact / correction]]`.

## 6. Séparation contenu / publicité

- Le **contenu éditorial est distinct de la publicité** : les liens d'affiliation et les emplacements display sont **clairement identifiés** (voir [politique d'affiliation](../legal/politique-affiliation.md)) et n'influencent pas les avis.
- Tout contenu **sponsorisé ou offert** porte une mention « Publicité » / « Collaboration commerciale » (loi 2023-451 modifiée).
- Les liens monétisés sont marqués `rel="sponsored nofollow"`.

## 7. Règle « pas de diagnostic »

- matoulab.fr **informe**, il ne **diagnostique** ni ne **soigne**. Toute page santé renvoie explicitement vers un vétérinaire et affiche le [disclaimer](../legal/disclaimer-veterinaire.md).

## 8. Ordre des garde-fous sur une page (rappel livrable 3)

`date MAJ → auteur → (revue véto si MED) → (disclosure affiliation si affilié) → (disclaimer si MED) → corps → maillage`.

---

*Charte interne, à tenir à jour. Toute page publiée doit être conforme à ces 8 points.*
