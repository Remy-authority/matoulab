---
title: "Politique de confidentialité (RGPD/CNIL)"
description: "Comment matoulab.com traite vos données personnelles (RGPD, CNIL). Analytics sans cookie."
updatedAt: "2026-07-11"
status: published
---

> **BROUILLON, à faire valider par un humain / conseil juridique avant mise en ligne ; ceci n'est pas un avis juridique.**
> Rédigé le 2026-07-11 pour **matoulab.com**. Reflète le choix de stack : analytics = **Cloudflare Web Analytics (cookieless, sans consentement)** ; MAIS les liens d'affiliation et tiers (régie display) peuvent déposer des traceurs → à divulguer et, le cas échéant, à soumettre au consentement.

# Politique de confidentialité, matoulab.com

## Fondements et références

- Règlement (UE) 2016/679 (**RGPD**) et loi n° 78-17 « Informatique et Libertés » modifiée.
- CNIL, cookies et traceurs / mesure d'audience (fiche « analytics ») : https://www.cnil.fr/fr/cookies-et-autres-traceurs (accédé 2026-07-11) ; fiche mesure d'audience : https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications (accédé 2026-07-11).
- Article 82 de la loi Informatique et Libertés (consentement au dépôt de traceurs non essentiels).
- Cloudflare Web Analytics, mesure sans cookie ni empreinte : https://blog.cloudflare.com/privacy-first-web-analytics/ (accédé 2026-07-11).

## 1. Responsable de traitement

Le responsable du traitement des données est l'éditeur du site (voir [Mentions légales](./mentions-legales.md)) :
- **Identité :** `[[À COMPLÉTER : nom / raison sociale de l'éditeur]]`
- **Contact données personnelles :** `[[À COMPLÉTER : e-mail dédié, ex. privacy@matoulab.com]]`
- **DPO :** `[[À COMPLÉTER : en principe non obligatoire pour un blog ; indiquer un contact ou "aucun DPO désigné, contact ci-dessus"]]`

## 2. Données collectées, finalités et bases légales

| Donnée | Finalité | Base légale (RGPD) | Origine |
|---|---|---|---|
| **Mesure d'audience agrégée** (pages vues, pays, référent, appareil) via **Cloudflare Web Analytics**, **sans cookie, sans empreinte, sans identifiant persistant** | Comprendre l'audience, améliorer le contenu | Intérêt légitime (art. 6-1-f), traitement exempté de consentement car cookieless et non intrusif ; **à confirmer** que la configuration reste anonyme | Navigation |
| **Données de connexion / logs techniques** (adresse IP, horodatage) au niveau de l'hébergeur/CDN | Sécurité, fourniture technique du service | Intérêt légitime + obligation légale de conservation | Serveur/CDN |
| **Formulaire de contact** (si activé) : nom, e-mail, message | Répondre à la demande | Intérêt légitime / consentement | Utilisateur |
| **Newsletter** (si activée) : e-mail | Envoi d'e-mails | Consentement (art. 6-1-a) | Utilisateur |
| **Traceurs tiers** (liens d'affiliation, régie display), voir §6 | Publicité / suivi de conversion par des tiers | Consentement (art. 82 LIL) lorsqu'un traceur non essentiel est déposé | Tiers |

> `[[À COMPLÉTER : ne conserver dans ce tableau que les traitements réellement activés. Retirer newsletter/formulaire s'ils n'existent pas.]]`

## 3. Durées de conservation

- Mesure d'audience Cloudflare : données agrégées, pas de profil individuel, `[[À VÉRIFIER : durée de rétention chez Cloudflare]]`.
- Logs techniques : `[[À COMPLÉTER : durée retenue, souvent ≤ 12 mois]]`.
- Contact : le temps de traiter la demande + `[[À COMPLÉTER]]`.
- Newsletter : jusqu'au retrait du consentement (désinscription).

## 4. Destinataires et sous-traitants

Les données peuvent être traitées par nos prestataires techniques (hébergeur/CDN, mesure d'audience) agissant comme **sous-traitants** au sens du RGPD :
- Hébergement / CDN / analytics : **Cloudflare**, `[[À VÉRIFIER : entité contractante et localisation]]`.
- `[[À COMPLÉTER : autres sous-traitants réels, e-mailing, etc.]]`

## 5. Transferts hors UE

Certains prestataires (ex. Cloudflare) peuvent impliquer des transferts hors Union européenne, encadrés par des garanties appropriées (clauses contractuelles types, etc.). `[[À VÉRIFIER : mécanisme de transfert du/des prestataire(s) réellement utilisé(s).]]`

## 6. Cookies et traceurs

**Mesure d'audience, Cloudflare Web Analytics :** solution **sans cookie et sans empreinte (fingerprint)**. Elle ne dépose donc aucun traceur nécessitant un consentement pour le simple comptage d'audience. En conséquence, **aucun bandeau de consentement n'est requis pour la seule mesure d'audience**. (Source Cloudflare + fiche CNIL mesure d'audience, ci-dessus.)

**Traceurs tiers (affiliation & publicité display) :**
- Les **liens d'affiliation** et les **régies publicitaires** (display) sont susceptibles de déposer des **cookies/traceurs de suivi de conversion ou publicitaires** au moment où l'utilisateur interagit avec eux. Ces traceurs relèvent de tiers et **requièrent le consentement préalable** de l'utilisateur au titre de l'article 82 de la loi Informatique et Libertés.
- **Conséquence pratique :** dès qu'une **régie display** (ex. bannières) ou tout script tiers déposant des traceurs non essentiels est activé, un **bandeau de consentement / CMP conforme CNIL devient obligatoire** (choix « accepter / refuser » aussi simple l'un que l'autre). Un simple lien d'affiliation « texte » qui ne dépose un cookie qu'après clic volontaire de l'utilisateur doit tout de même être divulgué ; le régime exact dépend de la technologie du programme d'affiliation.

> `[[À TRANCHER : au lancement, si l'on n'active QUE Cloudflare Web Analytics + liens d'affiliation texte, un bandeau CMP peut ne pas être requis pour l'analytics ; il le devient dès l'ajout d'une régie display à traceurs. Faire valider par un juriste avant d'activer la pub display.]]`

**Tableau des traceurs (à tenir à jour) :**

| Traceur | Émetteur | Finalité | Durée | Consentement requis |
|---|---|---|---|---|
| (aucun cookie analytics) | Cloudflare | Mesure d'audience cookieless |, | Non |
| `[[À COMPLÉTER : cookies affiliation]]` | `[[réseau]]` | Suivi de conversion | `[[durée]]` | Oui |
| `[[À COMPLÉTER : cookies régie display, si activée]]` | `[[régie]]` | Publicité | `[[durée]]` | Oui |

## 7. Vos droits (RGPD)

Vous disposez des droits d'**accès, de rectification, d'effacement, de limitation, d'opposition** et de **portabilité**, ainsi que du droit de définir des directives sur le sort de vos données après votre décès. Pour les exercer : `[[À COMPLÉTER : e-mail de contact]]`.

Vous pouvez introduire une réclamation auprès de la **CNIL** (Commission nationale de l'informatique et des libertés), https://www.cnil.fr/fr/plaintes (accédé 2026-07-11).

## 8. Sécurité

L'éditeur met en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données (HTTPS, hébergement/CDN sécurisé). Aucun système n'étant infaillible, une sécurité absolue ne peut être garantie.

---

*Modèle non contractuel. À adapter aux traitements réellement mis en œuvre, puis à faire valider par un conseil juridique avant publication.*
