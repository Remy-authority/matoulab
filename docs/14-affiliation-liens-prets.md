# Affiliation — blocs `products` prêts (cluster litière)

Statut : **candidatures Awin En attente** (Zooplus 7334, Maxi Zoo 68698, Santévet 29667) — Publisher ID Rémy = `2984845`.
Registre déjà activé dans `src/data/affiliates.ts` (zooplus + maxizoo `enabled:true`).
Mécanisme d'affichage déjà bâti : frontmatter `products:[{partner,url,label,note}]` → encart « Produits conseillés » + AffiliateDisclosure auto (ArticleLayout).

**⚠️ NE PAS coller ces blocs dans les articles avant qu'au moins un annonceur soit APPROUVÉ**
(l'autopilote déploie tout le site à chaque run → les liens partiraient live et non trackés).
À l'approbation : coller le bloc dans le frontmatter de l'article, `npm run build`, deploy.

## URLs marchand vérifiées (2026-07-14, pages valides)
- zooplus litière : `https://www.zooplus.fr/shop/chats/litiere_chat` (« Litière pour chat pas cher »)
- Maxi Zoo litière/accessoires : `https://www.maxizoo.fr/c/chat/litiere-et-accessoires/`
- (à vérifier au câblage) zooplus fontaines, zooplus bacs/maisons de toilette, zooplus arbres à chat.

## Blocs à coller (frontmatter, sous `faq:`)

### choisir-litiere-chat
```yaml
products:
  - partner: zooplus
    url: "https://www.zooplus.fr/shop/chats/litiere_chat"
    label: "Voir les litières pour chat sur zooplus"
    note: "large choix agglomérante, végétale, silice"
  - partner: maxizoo
    url: "https://www.maxizoo.fr/c/chat/litiere-et-accessoires/"
    label: "Litières et accessoires chez Maxi Zoo"
```

### litiere-agglomerante-ou-silice
```yaml
products:
  - partner: zooplus
    url: "https://www.zooplus.fr/shop/chats/litiere_chat"
    label: "Comparer les litières agglomérantes et silice"
```

### bac-litiere-nombre-emplacement / bac-litiere-grand-chat / nettoyer-bac-litiere / tapis-litiere-anti-projection
```yaml
products:
  - partner: maxizoo
    url: "https://www.maxizoo.fr/c/chat/litiere-et-accessoires/"
    label: "Bacs, maisons de toilette et accessoires (Maxi Zoo)"
```

### fontaine-a-eau-chat
```yaml
# URL fontaine à vérifier au câblage (zooplus /shop/chats/... fontaines).
```

## À faire à la 1re approbation
1. Coller les blocs ci-dessus (uniquement pour les annonceurs approuvés).
2. Styliser `.produits` / `.produits-note` dans `src/styles/global.css`.
3. `npm run build` vert → deploy (wrangler, token CF).
4. Vérifier sur `*.pages.dev` que le lien pointe vers `awin1.com/cread.php?awinmid=...&awinaffid=2984845&ued=...` et que l'encart transparence s'affiche.
