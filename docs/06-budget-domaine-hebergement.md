# Livrable AUT-5 — Demande de budget : domaine + hébergement

**Statut : DRAFT — en attente de validation Rémy avant tout achat.**
**Sources vérifiées le 2026-07-11.**

---

## Synthèse exécutive

| Poste | Option retenue | Coût an 1 | Coût récurrent |
|---|---|---|---|
| **Hébergement** | Cloudflare Pages (free tier) | **0 €** | 0 € |
| **Domaine** | `.fr` chez OVH (reco) | **~8 € HT** | ~8 € HT/an |
| **TOTAL** | | **~8 € HT** | ~8 € HT/an |

> **Budget demandé : ~10 € TTC pour l'année 1 (domaine .fr seul).**
> Hébergement = 0 € grâce à Cloudflare Pages (stack validée en AUT-4).
> Rien n'est acheté avant validation Rémy.

---

## 1. Hébergement — Analyse des options

### Option A — Cloudflare Pages ✅ RECOMMANDÉE

- **Coût : 0 €** (free tier permanent, pas de période d'essai)
- **Limites free tier** ([source: Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)) :
  - 500 builds/mois
  - Bande passante illimitée
  - 1 projet par domaine custom gratuit
  - SSL/TLS inclus, HTTP/3, CDN mondial
- **Adéquation** : Parfait pour un SSG Astro (builds légers, ~30 s par build). 500 builds/mois = environ 16 déploiements/jour — amplement suffisant pour le lancement d'un blog.
- **Risque** : Si le réseau monte à 10+ blogs actifs avec publications quotidiennes, les 500 builds peuvent se saturer → solution = batcher les builds ou passer au plan Pro ($20/mois). Non-bloquant en phase 1.

### Option B — Netlify (free tier)

- **Coût : 0 €** ([source: Netlify pricing](https://www.netlify.com/pricing/))
- Limites : 100 GB bande passante/mois, 300 min build/mois
- **Verdict** : Éliminée. La limite de 300 min build/mois est trop restrictive à l'échelle (vs illimité Cloudflare). Cloudflare Pages est supérieur pour ce cas d'usage.

### Option C — GitHub Pages

- **Coût : 0 €** ([source: GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits))
- Limites : 100 GB bande passante, 10 builds/heure, taille dépôt < 1 GB
- **Verdict** : Alternative viable mais l'écosystème Cloudflare (CDN, analytics WAF) est plus mature pour la performance SEO.

### Option D — Hébergeur mutualisé (o2switch, PlanetHoster, OVH perso)

- **Coût** : o2switch ~72 €/an HT ([source: o2switch.fr](https://www.o2switch.fr/hebergement-illimite/)), OVH perso ~35 €/an HT ([source: ovhcloud.com](https://www.ovhcloud.com/fr/web-hosting/))
- **Verdict** : Inutile pour un SSG. Un hébergement mutualisé est conçu pour du PHP/WordPress (serveur actif). Notre stack Astro génère du HTML statique → Cloudflare Pages est architecturalement supérieur ET moins cher.

### Option E — VPS (Hetzner, OVH VPS, Scaleway)

- **Coût** : Hetzner CX22 ~4-5 €/mois HT (~50-60 €/an) ([source: hetzner.com/cloud](https://www.hetzner.com/cloud/))
- **Verdict** : Surdimensionné pour la phase 1 (1 blog, trafic minimal). Ajoute une charge de maintenance serveur (mises à jour OS, sécurité) sans bénéfice. À reconsidérer si on sert du contenu dynamique (ex. personnalisation) dans une phase 3+.

---

## 2. Domaine — Analyse des options

### 2.1 Extension : .fr vs .com

| Critère | .fr | .com |
|---|---|---|
| **Signal géographique Google** | Fort (ciblage France automatique) | Neutre (paramétrage GSC requis) |
| **Confiance utilisateur FR** | Élevée (signe local, gage de sérieux) | Neutre |
| **Obligation légale** | Aucune, mais cohérent avec CNIL/RGPD FR | Aucune |
| **Disponibilité** | Meilleure pour noms courants | Souvent squatté sur les bons mots |
| **Prix annuel** | ~6-10 € HT | ~10-15 € HT |
| **Recommandation** | ✅ **Préféré** pour un blog FR ciblant la France | À utiliser si .fr indisponible ou si on vise FR+EN dès le départ |

**Verdict : .fr recommandé.** Cohérence avec le positionnement "blog chat francophone", meilleure confiance utilisateur, signal géo Google natif, et moins cher.

> *Note : si Rémy prévoit un déploiement EN rapide sur le même domaine, acheter le .com en même temps (~15 €/an) pour protéger la marque. Non indispensable en phase 1.*

### 2.2 Registraires — Comparaison prix domaine .fr

| Registraire | Prix .fr an 1 | Prix renouvellement | Notes |
|---|---|---|---|
| **OVH** | ~6,99 € HT | ~6,99 € HT/an | Leader FR, très fiable, panneau simple ([ovhcloud.com/fr/domains](https://www.ovhcloud.com/fr/domains/)) |
| **Namecheap** | ~4-6 $ | ~10 $ | Moins adapté au marché FR, support en EN |
| **Gandi** | ~9,99 € HT | ~9,99 € HT/an | Éthique, bon support FR, légèrement plus cher ([gandi.net](https://www.gandi.net/fr/domain)) |
| **PlanetHoster** | ~4,99 € HT | ~4,99 € HT/an | Prix agressif, hébergeur québécois présent en FR ([planethoster.com](https://www.planethoster.com/fr/Noms-De-Domaine)) |
| **OVH (reco)** | ✅ ~6,99 € HT | ~6,99 € HT/an | Meilleur rapport fiabilité/prix, facturation FR, DNS Anycast |

> ⚠️ **Prix indicatifs vérifiés le 2026-07-11 — à confirmer sur le site du registraire au moment de l'achat.** Les promotions "an 1 offert" changent fréquemment.

### 2.3 Suggestion de nom de domaine

Le nom de domaine exact dépend du nom du blog (non encore fixé). Critères :
- Court (2-3 mots max)
- Mémorable, thème chat/chat/félin
- Sans tiret si possible (meilleure UX)
- Disponible en .fr

**Exemples vérifiés (à valider par Rémy) :**
- `maison-feline.fr` — thématique comportement + lifestyle
- `chatexpert.fr` — autorité SEO, direct
- `vie-avec-mon-chat.fr` — conversationnel, long tail
- `chatbienetre.fr` — bien-être, litière/prévention

> Le nom définitif est à valider avant achat. Je peux proposer une short-list élargie si nécessaire.

---

## 3. Recommandation finale

```
OPTION RETENUE :
  Hébergement : Cloudflare Pages (free tier) → 0 €/an
  Domaine     : .fr chez OVH                → ~7-8 € HT/an (~8-10 € TTC)
  TOTAL AN 1  : ~8-10 € TTC (domaine seul)
```

**Pourquoi cette combo :**
1. Hébergement à 0 € permanent, performant, CDN mondial, SSL inclus — aucun compromis qualité.
2. Domaine .fr = signal géographique natif pour Google France, cohérence CNIL, confiance lecteurs.
3. OVH = registraire leader France, facturation EUR, fiable depuis 20+ ans.
4. Budget total dérisoire vs bénéfice SEO et crédibilité du blog.

**Ce que Rémy doit valider :**
- [ ] Montant : ~8-10 € TTC pour le domaine .fr
- [ ] Extension choisie : .fr (ou .fr + .com si protection marque souhaitée)
- [ ] Registraire : OVH (ou autre de la liste)
- [ ] Nom de domaine (à fixer avant achat)

---

## 4. Prochaines étapes post-validation

1. Rémy valide ce budget → on fixe le nom de domaine exact → achat domaine chez OVH.
2. Configurer le DNS Cloudflare (nameservers OVH → Cloudflare) — 10 min, gratuit.
3. Déployer le prototype Astro (déjà en cours) sur Cloudflare Pages avec le domaine custom.
4. Passer au Livrable 2 d'AUT-5 : build complet (gabarits E-E-A-T, analytics, pages légales).

---

*Document AUT-5, Livrable 1 — CEO Auto Blog IA, 2026-07-11*
