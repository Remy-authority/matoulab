---
title: "Exemple de page MED (YMYL), montre les champs OBLIGATOIRES"
description: "Gabarit d'une page santé : sans vetReview + disclaimer, le build échoue (voir content.config.ts)."
pillar: hygiene-prevention
kind: cluster
clusterParent: "hygiene-prevention"
author:
  name: "Rémy Zaoui"
  slug: "remy-zaoui"
  credentials: "Fondateur de Matoulab, passionné de chats"
updatedAt: "2026-07-11"
ymyl: true
medLevel: MED
# --- Champs imposés par le schéma dès que ymyl/MED = true ---
disclaimer: true
vetReview:
  reviewerName: "Dr [Nom], vétérinaire"
  reviewerCredential: "Docteur vétérinaire, Ordre National des Vétérinaires n°[XXXXX]"
  reviewedAt: "2026-07-11"
affiliate: true
status: draft   # ne passera 'published' qu'après revue véto + merge PR humain
---

*Page MED exemple. Si vous retirez `vetReview` OU `disclaimer`, `npm run build` échoue*
*avec le message du garde-fou (content.config.ts). Aucune page santé ne peut être*
*construite/publiée sans revue vétérinaire nommée + disclaimer. Contenu informatif,*
*jamais diagnostic.*
