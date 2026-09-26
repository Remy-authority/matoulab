# Matoulab (chats) : relance des articles (tasks/todo.md)

Mission (Rémy, 26/09/2026) : relancer la publication automatique, 3 articles par semaine pendant 3 mois,
brouillons écrits d'avance dans `content/drafts/`, suivi dans Rank OS. Kickoff du CEO affiliation du 27/09/2026.

## Plan
- [x] État des lieux vérifié (27/09) : file de sujets épuisée ; Gemini écrit encore mais ne fabrique plus d'images (quota gratuit à 0) ; images par fal.ai
- [x] 39 sujets choisis sur les recherches Google réelles (DataForSEO, France, 27/09), volumes exacts mesurés : `tasks/mots-cles/`
- [ ] GO de Rémy sur les sujets (et sur ~3 $ d'images fal.ai pour 3 mois, les deux blogs)
- [ ] 39 brouillons écrits (3 lots de 13) dans `content/drafts/NN-slug.md`, relecture à froid
- [ ] Robot adapté (un seul script pour les deux blogs) : premier brouillon, images fal.ai, arrêt propre quand le stock est vide
- [ ] Essai à blanc DRYRUN=1, puis GO de Rémy, puis 1 publication réelle prouvée (page 200 + photo, journal, run vert)
- [ ] Rank OS : fiche complétée, capture refaite ; docs/ETAT.md ; secrets vérifiés

## Les 39 sujets, dans l'ordre de publication

| N | Slug | Rubrique | Requête Google | Recherches/mois | Rayon Maxi Zoo | Titre |
|---|---|---|---|---|---|---|
| 01 | vermifuger-chat | hygiene-prevention | vermifuge chat | 33100 | /c/chat/hygiene-soin/protection-contre-tiques-parasites/ | Vermifuger son chat : pourquoi, quand et à quel rythme |
| 02 | chat-bengal-caractere | choisir-accueillir | chat bengal | 49500 | /c/chat/jouetspourchat/ | Chat bengal : un félin très actif, pour quel foyer ? |
| 03 | herbe-a-chat | comportement | herbe a chat | 14800 | /c/chat/jouetspourchat/jouets-valeriane-catnip/ | Herbe à chat : pourquoi elle rend votre chat fou (et est-ce sans risque ?) |
| 04 | croquettes-chat-sterilise | alimentation | croquettes chat stérilisé | 9900 | /c/chat/nourriture-pour-chat/nourriture-seche/ | Croquettes pour chat stérilisé : pourquoi changer et comment choisir |
| 05 | puces-chat | hygiene-prevention | puce chat | 18100 | /c/chat/hygiene-soin/protection-contre-tiques-parasites/ | Puces du chat : les repérer, traiter le chat et la maison |
| 06 | maine-coon-caractere-entretien | choisir-accueillir | chat maine coon | 40500 | /c/chat/griffoirs/arbrechat/ | Maine coon : caractère, taille et entretien avant d'adopter |
| 07 | harnais-chat-promener | comportement | harnais chat | 14800 | /c/chat/transport/harnais-laisses/ | Promener son chat en harnais : comment l'habituer pas à pas |
| 08 | distributeur-croquettes-automatique | alimentation | distributeur de croquettes pour chat | 12100 | /c/chat/gamelle-pour-chat-abreuvoirs/distributeurs/ | Distributeur de croquettes automatique : pour quels chats ? |
| 09 | age-chat-age-humain | hygiene-prevention | âge chat humain | 18100 | /c/chat/nourriture-pour-chat/ | Âge d'un chat en âge humain : le tableau et les étapes de vie |
| 10 | chat-sphynx-entretien | choisir-accueillir | chat sphynx | 27100 | /c/chat/couchettes-pour-chat/ | Sphynx, le chat sans poils : soins de peau et besoin de chaleur |
| 11 | chien-et-chaton-cohabitation | comportement | chien et chaton | 12100 | /c/chat/securite/ | Chien et chaton : réussir la première rencontre et la cohabitation |
| 12 | chat-vomit-ses-croquettes | alimentation | chat qui vomit | 5400 | /c/chat/gamelle-pour-chat-abreuvoirs/gamelles-a-nourriture/ | Chat qui vomit ses croquettes : pourquoi et que changer |
| 13 | litiere-automatique-chat | hygiene-prevention | litiere chat automatique | 12100 | /c/chat/hygiene-soin/bacs-et-accessoires-litiere/ | Litière automatique pour chat : avantages, limites et pour qui |
| 14 | chat-ragdoll-caractere | choisir-accueillir | chat ragdoll | 22200 | /c/chat/couchettes-pour-chat/ | Ragdoll : le chat « poupée de chiffon », calme et câlin ? |
| 15 | jouer-avec-un-chaton | comportement | jeux pour chaton | 6600 | /c/chat/chatons/jouets/ | Jouer avec un chaton : les bons jeux (et ceux qui apprennent à mordre) |
| 16 | friandises-chat | alimentation | friandise pour chat | 4400 | /c/chat/nourriture-pour-chat/friandises/ | Friandises pour chat : combien en donner sans déséquilibrer sa ration |
| 17 | tique-chat | hygiene-prevention | tique chat | 8100 | /c/chat/hygiene-soin/protection-contre-tiques-parasites/ | Tique sur un chat : la retirer sans risque et prévenir |
| 18 | chat-chartreux-caractere | choisir-accueillir | chat chartreux | 18100 | /c/chat/hygiene-soin/pelage-entretien-du-corps/ | Chartreux : caractère et besoins de ce chat au pelage bleu |
| 19 | pourquoi-mon-chat-me-leche | comportement | pourquoi mon chat me lèche | 2900 | /c/chat/jouetspourchat/ | Pourquoi mon chat me lèche : affection, marquage ou stress ? |
| 20 | chat-ne-mange-plus | alimentation | mon chat ne mange plus | 1600 | /c/chat/nourriture-pour-chat/nourriture-humide/ | Mon chat ne mange plus : les causes et quand consulter vite |
| 21 | meuble-litiere-chat | hygiene-prevention | meuble litiere chat | 8100 | /c/chat/hygiene-soin/bacs-et-accessoires-litiere/ | Meuble à litière : cacher le bac sans gêner le chat |
| 22 | british-shorthair-caractere | choisir-accueillir | chaton british | 14800 | /c/chat/hygiene-soin/pelage-entretien-du-corps/ | British shorthair : le chat nounours, caractère et entretien |
| 23 | chat-miaule-tout-le-temps | comportement | pourquoi mon chat miaule tout le temps | 1900 | /c/chat/jouetspourchat/jeu-dintelligence/ | Mon chat miaule tout le temps : que cherche-t-il à dire ? |
| 24 | gamelle-chat-surelevee | alimentation | gamelle chat surélevée | 1600 | /c/chat/gamelle-pour-chat-abreuvoirs/gamelles-a-nourriture/ | Gamelle surélevée pour chat : utile ou gadget ? |
| 25 | sterilisation-chat-age | hygiene-prevention | sterilisation chaton | 6600 | /c/chat/nourriture-pour-chat/nourriture-seche/ | Stériliser son chat : à quel âge et ce qui change ensuite |
| 26 | sacre-de-birmanie-caractere | choisir-accueillir | chaton sacré de birmanie | 12100 | /c/chat/hygiene-soin/pelage-entretien-du-corps/ | Sacré de Birmanie : caractère, pelage et vie en appartement |
| 27 | jouet-interactif-chat | comportement | jouet interactif chat | 1600 | /c/chat/jouetspourchat/jeu-dintelligence/ | Jouets interactifs pour chat : lesquels l'occupent vraiment |
| 28 | croquettes-hypoallergeniques-chat | alimentation | croquettes hypoallergéniques pour chat | 1600 | /c/chat/nourriture-pour-chat/nourriture-seche/ | Croquettes hypoallergéniques pour chat : dans quels cas ? |
| 29 | vaccins-chaton | hygiene-prevention | vaccins chaton | 5400 | /c/chat/chatons/soin/ | Vaccins du chaton : lesquels et à quel âge |
| 30 | chat-hypoallergenique | choisir-accueillir | chat hypoallergénique | 14800 | /c/chat/hygiene-soin/pelage-entretien-du-corps/ | Chat hypoallergénique : ce qui est vrai et ce qui ne l'est pas |
| 31 | chat-dort-sur-moi | comportement | pourquoi mon chat dort sur moi | 720 | /c/chat/couchettes-pour-chat/ | Pourquoi mon chat dort sur moi : ce que ça veut dire |
| 32 | croquettes-chat-senior | alimentation | croquettes chat senior | 1300 | /c/chat/nourriture-pour-chat/ | Croquettes pour chat senior : à partir de quel âge et pourquoi |
| 33 | couper-griffes-chat | hygiene-prevention | coupe griffe chaton | 5400 | /c/chat/hygiene-soin/pelage-entretien-du-corps/ | Couper les griffes de son chat : quand et comment sans le blesser |
| 34 | chat-poil-long-races-entretien | choisir-accueillir | chat poil long | 6600 | /c/chat/hygiene-soin/pelage-entretien-du-corps/ | Chat à poil long : quelles races et combien d'entretien ? |
| 35 | boite-conservation-croquettes | alimentation | boîte à croquettes pour chat | 1300 | /c/chat/gamelle-pour-chat-abreuvoirs/stockagedesaliments/ | Conserver les croquettes du chat : boîte, sac d'origine et durée |
| 36 | litiere-vegetale-chat | hygiene-prevention | litiere vegetale chat | 1600 | /c/chat/hygiene-soin/litiere-pour-chat/ | Litière végétale pour chat : maïs, bois, tofu, laquelle choisir |
| 37 | sevrage-chaton-age-adoption | choisir-accueillir | sevrage chaton | 5400 | /c/chat/chatons/nourriture/ | Sevrage du chaton : à quel âge peut-il quitter sa mère ? |
| 38 | caisse-transport-chat | choisir-accueillir | caisse de transport pour chat | 5400 | /c/chat/transport/caisse-de-transport/ | Caisse de transport pour chat : laquelle choisir et comment l'y habituer |
| 39 | chatiere-electronique | choisir-accueillir | chatiere electronique | 5400 | /c/chat/securite/chatieres-portes/ | Chatière électronique : comment elle marche et laquelle choisir |

Source des volumes : `tasks/mots-cles/sujets-volumes.tsv` (Google Ads, France, 27/09/2026). Aucune propriété Search Console
n'existe pour ce domaine côté compte de service : les sujets viennent donc de DataForSEO (suggestions + volumes exacts).
