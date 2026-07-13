---
title: "Avertissement santé (contenu vétérinaire)"
description: "Le contenu santé de matoulab.com est informatif et ne remplace pas une consultation vétérinaire."
updatedAt: "2026-07-11"
status: published
---

> **BROUILLON, à faire valider par un humain / conseil juridique avant mise en ligne ; ceci n'est pas un avis juridique.**
> Rédigé le 2026-07-11 pour **matoulab.com**. À afficher sur **toute page santé / MED** (contenu YMYL, santé animale). Cohérent avec le composant `Disclaimer.astro` (livrable 3).

# Disclaimer vétérinaire, contenu santé animale (YMYL)

## Pourquoi ce disclaimer

La santé animale est un sujet **YMYL** (« Your Money or Your Life ») : Google et les bonnes pratiques éditoriales exigent une fiabilité renforcée. Un disclaimer ne remplace pas la qualité du contenu (relecture vétérinaire réelle, voir la [charte E-E-A-T](../editorial/charte-eeat.md)), mais il **cadre la portée** de l'information et protège le lecteur comme l'éditeur.

Références :
- Google, « Creating helpful, reliable, people-first content » (E-E-A-T, cas YMYL) : https://developers.google.com/search/docs/fundamentals/creating-helpful-content (accédé 2026-07-11).
- L'exercice de la médecine et de la chirurgie des animaux est **réservé aux vétérinaires** ; l'exercice illégal (diagnostic, consultation, prescription par une personne non vétérinaire) est puni de **2 ans d'emprisonnement et 30 000 € d'amende**, Code rural et de la pêche maritime, **art. L.243-1** : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000024025961 (accédé 2026-07-11). Ce texte justifie que le site **ne pose jamais de diagnostic** et **ne se substitue jamais** à une consultation.

## A. Encadré court, à afficher EN TÊTE de chaque page santé/MED

> **Information, pas un avis vétérinaire.** Ce contenu est fourni à titre informatif et ne remplace **pas** une consultation vétérinaire. Il ne constitue ni un diagnostic, ni une prescription, ni un traitement. En cas de doute, de symptôme ou d'urgence concernant votre animal, **consultez un vétérinaire**. En cas d'urgence, contactez sans délai votre vétérinaire ou un service vétérinaire d'urgence.

## B. Version longue, bas de page santé / page « Avertissement santé »

**Avertissement, contenu de santé animale.**

Les articles de la rubrique santé de matoulab.com sont rédigés dans un but **d'information générale** et, lorsque indiqué, **relus par un vétérinaire** (voir l'encadré « Relu par… » de l'article). Malgré ce soin :

- Ce contenu **ne constitue pas un avis vétérinaire individualisé** et **ne remplace pas** l'examen, le diagnostic et les conseils d'un vétérinaire connaissant votre animal.
- Chaque animal est différent : âge, race, poids, antécédents et pathologies modifient la conduite à tenir. **N'appliquez aucune recommandation générale sans validation d'un vétérinaire.**
- **N'administrez jamais** de médicament, d'antiparasitaire ou de complément sans avis vétérinaire : certains produits (y compris « naturels » ou destinés à l'humain ou au chien) sont **toxiques pour le chat**.
- **En cas d'urgence** (difficulté respiratoire, ingestion de toxique, blessure, absence d'urine, prostration…), **ne perdez pas de temps** : contactez immédiatement un vétérinaire ou un service d'urgence.
- matoulab.com décline toute responsabilité quant à l'usage fait de ces informations, dans les limites permises par la loi.

**Relu par :** `[[À SÉCURISER : vétérinaire relecteur réel, Dr [Nom], vétérinaire, n° d'inscription à l'Ordre le cas échéant]]`, ne jamais afficher cette mention sans relecture réelle par un vétérinaire identifié.

**Date de dernière revue vétérinaire :** `[[À COMPLÉTER : date]]`.

---

*Règle produit (héritée AUT-3, livrable 3) : une page MED ne doit pas pouvoir être publiée sans `vetReview` + `disclaimer` (typage `content.config.ts`). Ce disclaimer ne dispense JAMAIS de la relecture vétérinaire réelle.*

*Modèle non contractuel, à faire valider par un vétérinaire et un conseil juridique avant mise en ligne.*
