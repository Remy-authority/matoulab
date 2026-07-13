# Méthodologie éditoriale, signature & sourcing santé (version honnête)

**Date : 2026-07-11.** Ce document répond à la demande de Rémy (lancer vite, sans
embaucher de vétérinaire) **d'une manière qui protège le ROI SEO du projet** au lieu
de le détruire. Il remplace deux idées risquées par des alternatives honnêtes qui
atteignent le même objectif business.

---

## Pourquoi on ne fabrique pas un faux expert ni une fausse relecture véto

Le cœur de la stratégie validée en AUT-2/3/4, c'est l'**autorité SEO (E-E-A-T)**.
Deux raccourcis la saboteraient :

1. **Inventer un auteur expert fictif (faux nom + fausse bio « spécialiste »).**
   - Google traite les **profils d'auteurs fabriqués** comme un signal de spam
     (site made-for-SEO). Risque : déclassement de **tout** le domaine → le trafic,
     donc le revenu, s'effondre. On dépenserait de l'énergie pour un actif fragile.
   - C'est aussi **trompeur pour le lecteur** sur un sujet où la confiance = la marque.

2. **Republier du contenu de vétérinaires étrangers et le présenter comme le nôtre /
   « relu par un vétérinaire ».**
   - **Copyright** : traduire/copier un article d'un vét américain sans licence est
     une contrefaçon (risque juridique réel, y compris DMCA/déréférencement).
   - **YMYL santé animale** : en France, poser des actes proches du diagnostic est
     réservé aux vétérinaires (Code rural art. L.243-1). Prétendre une relecture véto
     inexistante nous expose et trompe le lecteur.
   - **Duplicate content** : du contenu recopié ne rankera pas — Google favorise
     l'original. On ne gagnerait rien en SEO.

> En clair : ces deux raccourcis coûtent cher (pénalité + risque juridique) pour un
> gain nul. On peut atteindre le **même objectif — lancer vite, sans payer de véto —**
> proprement.

---

## Ce qu'on fait à la place (honnête ET rapide, toujours 0 embauche)

### A. Signature / byline — 3 options honnêtes (aucune n'invente un faux expert)

| Option | Ce que c'est | E-E-A-T | Reco |
|---|---|---|---|
| **1. Byline éditoriale de marque** — « **La rédaction de Matoulab** » | Le site assume collectivement ses articles, avec une page « À propos » qui explique la méthode et les sources. Pas d'individu inventé. | Honnête, courant sur les médias sérieux. Bon signal si la page « À propos » est solide. | ✅ **Recommandée** — 0 effort, 0 mensonge, déployable tout de suite |
| **2. Rémy, éditeur nommé** | Ton vrai nom (ou un pseudo que tu assumes), décrit honnêtement : « fondateur, passionné de chats », **jamais** « vétérinaire » ni « comportementaliste diplômé ». | Fort (personne réelle derrière le site). | ✅ Bonne si tu veux incarner la marque |
| **3. Vrai rédacteur nommé** | Une personne réelle recrutée plus tard, avec sa vraie bio. | Le plus fort. | ⏳ Plus tard |
| ❌ Faux expert inventé | Nom + fausse bio « spécialiste ». | **Risque de pénalité Google.** | ❌ Écarté |

**Décision par défaut si tu ne tranches pas : Option 1 (« La rédaction de Matoulab »).**

### B. Contenu santé — utiliser les sources vétérinaires, légalement

Ton instinct (« s'appuyer sur des vétérinaires reconnus ») est **le bon** — il faut
juste le faire en **citant**, pas en copiant :

1. **Écriture 100 % originale en français** — on ne traduit/copie jamais un article
   source. On lit plusieurs sources autorisées, on synthétise avec nos propres mots.
2. **Citer les sources faisant autorité** (associations vétérinaires, écoles véto,
   organismes publics — FR et international). Les **citer renforce** l'E-E-A-T.
3. **Rester au niveau prévention / entretien / lifestyle** (litière, hygiène, choix
   d'accessoires, signes à surveiller) — **jamais de diagnostic ni de posologie**.
4. **Disclaimer systématique** : « Contenu informatif, ne remplace pas une consultation
   vétérinaire » + **on n'écrit jamais « relu par un vétérinaire » tant que c'est faux.**
5. Les vraies pages **médicales (MED)** restent bloquées par le garde-fou codé tant
   qu'aucun vétérinaire réel ne les a relues. On lance donc **sans elles**.

### C. Ordre de lancement recommandé (qualité > quantité)

- **Phase de lancement = Pilier 1 « comportement » (NON-YMYL)** : miaulements, griffades,
  langage corporel, propreté comportementale. **Aucune relecture véto requise**,
  aucun risque santé. C'est notre pilier d'autorité (AUT-3) → parfait pour démarrer.
- **Pilier 4 « hygiène/prévention »** : uniquement l'angle **entretien/lifestyle**
  (choix de litière, brossage, accessoires — c'est là qu'est l'affiliation/revenu),
  avec sources citées + disclaimer, **sans basculer en contenu médical**.
- **Contenu médical (MED)** : différé jusqu'à ce qu'un relecteur véto réel existe
  (ou abandonné si on ne veut pas payer — le blog vit très bien sans).

---

## Impact sur le build (déjà en place)
- `authors.json` : on y met une entrée honnête (byline éditoriale ou Rémy), `confirmed: true`.
- Le garde-fou `content.config.ts` reste inchangé : il **empêche** de publier une page
  MED sans relecture véto — c'est notre filet de sécurité, on le garde.
- Chaque article citera ses sources en bas de page (à ajouter au gabarit article).

*Méthodologie éditoriale — CEO Auto Blog IA, 2026-07-11. À valider par Rémy.*
