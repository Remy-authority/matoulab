# Doc 12 — Plan d'activation monétisation & affiliation (Matoulab)

> **Statut : plan sourcé, prêt à activer. AUCUNE inscription, AUCUN lien affilié en ligne, AUCUNE dépense engagée à ce stade.**
> Rédigé le 2026-07-13 pour matoulab.com (AUT-9, chantier n°5). Toutes les données commerciales sont vérifiées sur sources officielles à la date d'accès indiquée. Ce qui n'a pas pu être vérifié est marqué « non vérifié ». Rien n'est inventé.
> Prérequis avant toute mise en ligne : (a) accord de Rémy sur les programmes, (b) comptes créés + identifiants de tracking fournis par Rémy, (c) un token Cloudflare pour déployer.

Complète les docs [04 (analytics + monétisation + conformité)], [09 (SEO mots-clés)], [11 (cadence)]. L'infrastructure technique de conformité est **déjà construite** (voir §5).

---

## 1. Principe stratégique (rappel)

Matoulab est en **jeu long** : ~0 revenu attendu les premiers mois, priorité à l'autorité et au trafic. La monétisation se **branche progressivement**, sans jamais dégrader la qualité ni enfreindre les règles Google (pas de backlinks dofollow vendus, disclosure obligatoire, liens marqués `rel="sponsored"`).

Ordre d'activation recommandé :
1. **Affiliation e-commerce animalerie** sur le cluster à intention commerciale (litière/accessoires) — c'est là que l'internaute est en phase d'achat.
2. **Affiliation assurance (Santévet)** plus tard et avec prudence (produit régulé, sensibilité YMYL — voir §4).
3. **Publicité display** seulement quand le trafic est amorcé (voir §6) — inutile et peu rémunérateur sur un site jeune.

La règle : **un revenu se branche là où l'intention d'achat existe déjà**, jamais en collant des liens partout.

---

## 2. Programmes d'affiliation — comparatif sourcé (accès 2026-07-13)

| Programme | Réseau | Commission | Cookie | France | Friction d'entrée |
|---|---|---|---|---|---|
| **Amazon Partenaires** | En propre (Club Partenaires Amazon) | **3 %** catégorie Animalerie¹ | 24 h (panier étendu ~90 j)² | Oui | Inscription gratuite, mais **3 ventes éligibles en 180 j** sinon rejet (compte non réactivable)³ |
| **zooplus** | **Awin** | **3 %** nouveaux/récents clients ; **1 %** clients établis (4+ commandes) ; 2 % assos/refuges | 30 j | Oui | Passe par l'inscription Awin (voir ci-dessous) |
| **Awin (réseau)** | — | dépend de l'annonceur | dépend | Oui (marché coeur) | **Frais d'inscription 5 £ (~5 €), remboursables**⁴ : recrédités au 1er seuil de paiement, ou remboursables si refus. Revue manuelle ~24 h |
| **Santévet** (assurance) | Affilae + Awin (merchant 29667) | **6 €/lead** (CPL) confirmé ; « 45 €/vente » **non vérifié** (agrégateurs seulement) | 30 j | Oui | Régulé (assurance, ORIAS) — voir §4 |
| **MaxiZoo FR** (Fressnapf) | **Awin** (merchant 68698) | jusqu'à **8 %** nouveaux / 4 % établis (min. commande 19 €) | 60 j (30 j selon section) | Oui | via Awin ; pas d'enchère sur la marque |
| **Bitiba FR** (groupe zooplus) | Awin | ~0,8–2,4 % (non vérifié FR) | 30 j | Oui | via Awin |
| Wanimo | Kwanko/NETaffiliation | 10 %/vente + 0,30 €/formulaire (roundup) | 30 j | Oui | compte Kwanko séparé |
| Ultra Premium Direct (UPD) | Affilae | 6–10 % (non vérifié officiel) | 30 j | Oui | compte Affilae séparé |

¹ Amazon FR ne liste pas « Animalerie » comme catégorie nommée : elle tombe dans « Toutes les autres catégories = 3 % ». La grille personnalisée (login) n'a pas pu être vérifiée. Source : https://partenaires.amazon.fr/help/node/topic/GRXPHT8U84RAYDXZ
² Source cookie : https://partenaires.amazon.fr/help/node/topic/G9SMD8TQHFJ7728F
³ Source règle 3 ventes/180 j : https://partenaires.amazon.fr/help/node/topic/G7MJTPEP9NC3YKMG
⁴ Source frais Awin : https://www.awin.com/gb/compliance-and-regulations/application-process-and-joining-fee

Sources programmes : zooplus https://www.zooplus.fr/info/about/programme_affiliation + https://ui.awin.com/merchant-profile/7334 ; Santévet https://www.santevet.com/programme-daffiliation-santevet + https://ui.awin.com/merchant-profile/29667 (tous accédés 2026-07-13).

---

## 3. Recommandation de démarrage

**Commencer par 2 programmes, pas plus :**

- **Amazon Partenaires France** — le plus simple (inscription gratuite, immense catalogue litière/bacs/accessoires, l'internaute a souvent déjà un compte Amazon → meilleur taux de conversion). ⚠️ **Attention au verrou des 3 ventes en 180 jours** : ne s'inscrire que quand on est prêt à insérer réellement les liens et à générer un peu de trafic, sinon le compte est rejeté sans réactivation possible. → **À activer une fois le cluster litière branché et un minimum de trafic présent** (lecture GSC, doc 09).
- **Awin (pour zooplus)** — commission 3 % sur un panier animalier élevé, cookie 30 j (bien plus confortable que les 24 h d'Amazon). Frais de 5 € **remboursables** = seule « dépense », à valider par Rémy. **Avantage clé : un seul compte Awin ouvre plusieurs annonceurs animaliers FR** — zooplus (3 %), **MaxiZoo (jusqu'à 8 %, source primaire vérifiée)**, Bitiba, et même Santévet — sans multiplier les inscriptions.

**Santévet : plus tard.** Le CPL à 6 €/lead est le plus gros levier unitaire, mais c'est de l'**assurance régulée** (voir §4) : à réserver à un contenu éditorial dédié, prudent et sans posture de conseil, une fois l'autorité installée.

**Rémunération réaliste, honnête :** à faible trafic (site de ~1 mois, indexation en cours), les gains seront **quasi nuls** les premiers mois — c'est normal et prévu. L'intérêt d'installer les liens maintenant est de préparer le terrain et de mesurer la conversion, pas d'espérer un revenu immédiat.

---

## 4. Garde-fous conformité (déjà en place + points d'attention)

- **Disclosure obligatoire** avant le premier lien affilié (art. L.121-3 Code conso, loi influenceurs 2023-451 modifiée). → composant `AffiliateDisclosure.astro` déjà construit, rendu en tête d'article dès `affiliate: true`.
- **Marquage technique** : chaque lien monétisé en `rel="sponsored nofollow noopener"` (reco Google). → composant `AffiliateLink.astro` déjà construit.
- **Page « Politique d'affiliation »** (`/affiliation`) déjà rédigée et publiée, sources juridiques à jour.
- **Santévet / assurance (YMYL régulé)** : Santévet est distribué par Vetassur, **courtier ORIAS n° 07003163**, supervisé ACPR. En tant qu'affilié, Matoulab **fait de la publicité, pas de l'intermédiation** : contenu éditorial/comparatif uniquement, **jamais de « conseil » en assurance** (réservé aux acteurs immatriculés), disclosure claire, renvoi des conditions contractuelles vers Santévet. Cohérent avec notre ligne E-E-A-T (pas de faux expert). Source mentions légales : https://www.santevet.com/mentions-legales (accédé 2026-07-13).
- **Pas de backlinks dofollow vendus** (règle non négociable, inchangée).

---

## 5. Où brancher les premiers liens (cluster litière)

Le cluster Hygiène/litière (7 articles) est le meilleur point de départ : intention d'achat forte. Placement proposé (liens à insérer **une fois les identifiants de tracking reçus**, articles passés en `affiliate: true`) :

| Article | Produits pertinents (exemples génériques, sélection éditoriale indépendante) |
|---|---|
| `choisir-litiere-chat` | litière agglomérante / végétale / silice (comparatif → liens) |
| `litiere-agglomerante-ou-silice` | 1 référence de chaque type comparé |
| `bac-litiere-grand-chat` | bacs XXL / maisons de toilette grand format |
| `nettoyer-bac-litiere` | pelle, sacs, nettoyant enzymatique, tapis de litière |
| `chat-perd-ses-poils` | brosse / gant de toilettage / brosse anti-mue |

**Règle éditoriale (E-E-A-T) :** on recommande un **type de produit utile au lecteur**, choisi indépendamment ; le lien affilié est la commodité d'achat, pas la raison du contenu. Pas de survente, pas de « meilleur produit » non justifié.

---

## 6. Publicité display — quand, pas maintenant (sourcé 2026-07-13)

| Réseau | Seuil d'entrée | Réaliste pour Matoulab ? |
|---|---|---|
| **Google AdSense** | Aucun minimum de trafic | ✅ Seule option activable tôt, mais RPM faible |
| **Mediavine Journey** | 1 000 sessions/mois | ✅ Atteignable une fois le trafic amorcé |
| **Raptive** | 25 000 pages vues/mois **+ 50 % de trafic anglophone (US/UK/CA/NZ/AU)** | ⚠️ La règle géographique bloque un site à audience française |
| **Ezoic** | 250 000 utilisateurs/mois (changement 2026) | ❌ Hors de portée |

Sources : AdSense https://support.google.com/adsense/answer/9724 ; Mediavine https://www.mediavine.com/mediavine-requirements/ ; Raptive https://raptive.com/blog/opening-the-door-to-more-creators-who-meet-raptive-quality-standards/ ; Ezoic https://support.ezoic.com/kb/article/getting-started-ezoics-requirements (tous accédés 2026-07-13).

**Reco display :** ne rien mettre maintenant. La pub display sur un site jeune rapporte des centimes et dégrade l'expérience (vitesse, RGPD → bannière de consentement obligatoire dès qu'on sert de la pub). **Cible : Mediavine Journey à ~1 000 sessions/mois**, sinon AdSense en dépannage plus tard. On rebranche ce sujet quand GSC montre du trafic.

---

## 7. Étapes concrètes (qui fait quoi)

**Ce que je fais moi (autonome, 0 dépense) — déjà fait ou prêt :**
- ✅ Infra conforme construite (`AffiliateLink`, `AffiliateDisclosure`, page `/affiliation`).
- ✅ Ce plan sourcé.
- ✅ **Activation rendue turnkey** : registre `src/data/affiliates.ts` (Amazon + Awin/zooplus [mid 7334] + MaxiZoo [mid 68698]) + `AffiliateLink` branché dessus. **Activer = 1 seule opération : passer `enabled: true` + coller ton identifiant de tracking dans ce fichier.** Tant que c'est vide, aucun lien ne sort (le composant affiche le libellé en texte simple, jamais de lien non tracké). Réutilisable pour l'usine à blogs (AUT-8).
- ⏳ Sur ton feu vert : rédiger les sections « produits » du cluster litière et insérer les liens `<AffiliateLink partner="…" url="…" label="…" />`, passer les articles en `affiliate: true`, déployer, vérifier.

**Ce qui nécessite Rémy (décision + comptes, car je n'ai ni moyen de paiement ni tes identités) :**
1. Choisir les programmes de départ (reco : Amazon Partenaires FR + Awin/zooplus).
2. Créer les comptes (Amazon Partenaires ; Awin — frais 5 € remboursables à valider) et me transmettre les **identifiants de tracking** (tag Amazon `?tag=…`, ID éditeur Awin).
3. Me re-fournir un **token Cloudflare** pour déployer la mise en ligne.

Tant que ces 3 points ne sont pas réunis, **rien ne passe en ligne** : les articles restent `affiliate: false`.

---

## 8. Journal des sources (accès 2026-07-13)
- Amazon Partenaires FR : partenaires.amazon.fr (landing, GRXPHT8U84RAYDXZ, G7MJTPEP9NC3YKMG, G9SMD8TQHFJ7728F)
- zooplus : zooplus.fr/info/about/programme_affiliation ; ui.awin.com/merchant-profile/7334
- Awin : awin.com/gb/compliance-and-regulations/application-process-and-joining-fee
- Santévet : santevet.com/programme-daffiliation-santevet ; ui.awin.com/merchant-profile/29667 ; santevet.com/mentions-legales
- Display : support.google.com/adsense/answer/9724 ; mediavine.com/mediavine-requirements ; raptive.com/blog/opening-the-door… ; support.ezoic.com/kb/article/getting-started-ezoics-requirements
