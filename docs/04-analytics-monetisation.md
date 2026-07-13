# Livrable 4 — Instrumentation analytics + monétisation + conformité

**Sources vérifiées le 2026-07-11.** Recommandations = 0 dépense au lancement.

## A. Analytics — recommandation : Cloudflare Web Analytics

| Outil | Coût au lancement | Cookies / consentement |
|---|---|---|
| **Cloudflare Web Analytics** ✅ | **Gratuit**, aucun serveur | **Cookieless** → aucun bandeau requis pour l'analytics ([Cloudflare](https://blog.cloudflare.com/privacy-first-web-analytics/)) |
| GA4 | Gratuit | Cookies → **Consent Mode v2 + CMP obligatoires** en EEE ([CookieYes](https://www.cookieyes.com/knowledge-base/google-consent-mode/is-google-consent-mode-mandatory-in-2024/)) |
| Plausible Cloud | **Payant** (~9$/mo) | cookieless (mais coût) — [Plausible](https://plausible.io/self-hosted-web-analytics) |
| Matomo self-host | logiciel gratuit **mais VPS payant** | Config exemptée de consentement possible (guide CNIL) |

**Choix : Cloudflare Web Analytics** — seul outil à la fois *réellement 0 €, sans serveur*, **et** *cookieless* (donc pas de bandeau consentement rien que pour mesurer l'audience). Cohérent avec l'hébergement Cloudflare Pages (livrable 1). Évolution possible : Matomo self-host en mode exempté CNIL si on veut des tunnels/événements avancés.

## B. Conformité CNIL / RGPD

- **Bandeau consentement (CMP) obligatoire** dès qu'on dépose un traceur non essentiel (GA4, pixels pub). Avec Cloudflare Web Analytics (cookieless) → **pas de bandeau requis pour l'analytics**. ([CNIL fiche n°16](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications))
- **Exemption mesure d'audience** (si un jour Matomo) : 7 conditions cumulatives CNIL (IP tronquée, cookie ≤13 mois, first-party only, opt-out, pas de croisement…). Guide de config Matomo officiel CNIL ([PDF](https://www.cnil.fr/sites/cnil/files/atoms/files/matomo_analytics_-_exemption_-_guide_de_configuration.pdf)).
- **Politique de confidentialité** publiée (analytics + relation d'affiliation + opt-out) — requise même sous l'exemption. ([CNIL fiche n°16](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications))

## C. Monétisation — liens affiliés (rafraîchi 2026-07-11)

| Programme | Réseau | Modèle / commission | Cookie | Source |
|---|---|---|---|---|
| **SantéVet** (assurance) ⭐ levier n°1 | **Affilae** (officiel) ; aussi listé Awin (ID 29667) | **Lead + vente : ~6€/lead + ~45€/vente** (chiffres rapportés par annuaires, **non publiés sur le site SantéVet → estimation**) | ~30 j (rapporté, non confirmé — *estimation*) | [santevet.com](https://www.santevet.com/programme-daffiliation-santevet) · [affilae](https://affilae.com/en/affiliate-program-sante-vet) |
| **Ultra Premium Direct (UPD)** ⭐ levier n°2 | **Affilae** | **10% nouveau client, 6% existant** ; gratuit, seuil 50€ | non publié (*estimation*) | [ultrapremiumdirect.com](https://www.ultrapremiumdirect.com/page/affiliation/) |
| Zooplus | **Awin** (7334) | **jusqu'à 3%** (1% clients établis) | **30 j** | [zooplus.fr](https://www.zooplus.fr/info/about/programme_affiliation) · [awin 7334](https://ui.awin.com/merchant-profile/7334/commission-groups) |
| Wanimo | **NetAffiliation/Kwanko** | **10% nouveau, 4% récurrent, +0,30€/formulaire** | 30 j | [clubaffiliation](https://www.clubaffiliation.com/programme/wanimo-1972.html) |
| Maxi Zoo | **Awin** (68698) | **jusqu'à 8%** panier net | non publié (*estimation*) | [awin 68698](https://ui.awin.com/merchant-profile/68698) |
| HomyCat (arbres à chat) | in-house | **9–13%** paliers | non publié | [homycat.com](https://homycat.com/pages/programme-daffiliation-homycat-site-animaux-affiliation-site-deco-affiliation) — ⚠️ **exige un SIRET** |

**Correction vs AUT-3** : « Wamiz/UPD via Affilae » était une confusion. **Wamiz = média display (pas de programme d'affiliation CPA public)** ; **UPD = Ultra Premium Direct** (Affilae, 10%/6%). SantéVet = **Affilae** (officiel), pas NetAffiliation.

**Réseaux — barrière d'entrée (gratuits pour l'éditeur) :** Awin (dépôt 5$ remboursé), Affilae (0 frais éditeur), NetAffiliation/Kwanko (gratuit, seuil 50€). Sources : [awin FAQ](https://www.awin.com/us/faqs), [affilae](https://affilae.com/en/logiciel-affiliation/), [kwanko](https://www.kwanko.com/publishers/).

**Meilleur levier pour un blog neuf/faible autorité : SantéVet (lead ~6€).** Payé sur un formulaire, pas un achat → convertit même à faible trafic/intention. Secondaire : UPD (10%, angle « made in France » pour les comparatifs croquettes). **On déprioritise** Zooplus/Maxi Zoo au début (≤3–8% CPS = besoin de volume d'achat qu'un site neuf n'a pas). HomyCat = attractif mais **bloqué par l'exigence SIRET**.

## D. Obligations de disclosure affiliation (France) — implémentées

- **Obligation légale** : ne pas signaler la nature commerciale = pratique commerciale trompeuse par omission, **art. L.121-3 Code de la consommation** (jusqu'à 2 ans / 300 000 €). Disclosure **visible et avant le clic**. ([DGCCRF/Deshoulières](https://www.deshoulieres-avocats.com/marketing-daffiliation-transparence-sanctions-dgccrf/))
- **Loi influenceurs n°2023-451 (9 juin 2023)** : label clair « Publicité » / « Collaboration commerciale » sur contenu promu rémunéré. ([Légifrance](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047663185))
- **Google** : marquer les liens monétisés `rel="sponsored"` (nofollow accepté en repli). ([Search Central](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links))

→ Implémenté : `AffiliateDisclosure.astro` (haut de page, avant le 1er lien) + `AffiliateLink.astro` (`rel="sponsored nofollow"`) + flag `affiliate` dans le schéma de contenu.

> *Caveat : brief de recherche, pas un avis juridique. Confirmer le texte CNIL courant et consulter un avocat FR avant de monétiser à l'échelle.*

## E. RPM réaliste (rappel AUT-3, estimation)
2–8 €/1000 vues les 6 premiers mois (display + affiliation), **estimation** dépendante du trafic et du mix SantéVet/UPD. Revenu quasi nul attendu au départ (mission : ~0 € les ~6 premiers mois).
