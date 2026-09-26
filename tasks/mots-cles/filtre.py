import json, sys, re, unicodedata
s=sys.argv[1]; n=int(sys.argv[2]) if len(sys.argv)>2 else 300
d=json.load(open(f'{s}/tasks/mots-cles/{s}-suggestions.json'))
BRUIT=r"gpt|gp t|chpt|pgt|hpt|\bgt\b|got|gps(?! pour)|ai\b|\bi a\b|\bia\b|online|gratuit|inscri|roulette|roul|omeg|colori|dessin|nrj|bounty|mistral|google|europ|coco|random|\bnow\b|camera|caméra|film|botté|potté|shrek|gabby|poisson|langue|café|bar a|latte|travel|relais|chit|omega|\bcam|pété|gay|control|\bfr\b|\bfrr\b|free|artificial|intelligence|pokemon|minecraft|lego|peluche|tatouage|meme|image|photo|video|drole|drôle|moche|mignon|a donner|donne|prix|assurance|mutuelle|royal|purina|credelio|\bnom\b|prenom|prénom|sauvage|pallas|le chat noir|les chat|l'évolution|\ble chat\b$|guépard|com\b"
def norm(k): return " ".join(sorted(unicodedata.normalize('NFD',k).encode('ascii','ignore').decode().replace('chaton','chat').replace('pour','').replace('à','a').split()))
best={}
for g,items in d.items():
  for i in items:
    k=i['kw']; v=i['vol'] or 0
    if len(k.split())<2 or re.search(BRUIT,k): continue
    key=norm(k)
    if key not in best or v>best[key]['vol']: best[key]={**i,'vol':v}
rows=sorted(best.values(),key=lambda x:-x['vol'])
print(len(rows))
print("\n".join(f"{r['vol']}\t{(r['cpc'] or 0):.2f}\t{r['intent']}\t{r['kw']}" for r in rows[:n]))
