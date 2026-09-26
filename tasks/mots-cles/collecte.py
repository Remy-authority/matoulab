#!/usr/bin/env python3
"""Collecte des recherches Google reelles (France, francais) pour trouver les sujets
d'articles : DataForSEO Labs keyword_suggestions, UNE graine par appel (l'endpoint
live n'accepte qu'une tache). Sortie : <site>-suggestions.json a cote de ce script.
Usage : python3 collecte.py matoulab|reptilab
Cout : ~0,01 $ + 0,0001 $/ligne par graine (lu dans la reponse, cumule et affiche)."""
import base64, json, sys, urllib.request, pathlib
USER, PWD = "remy@remyzaoui.com", "5be015b2fe6a43f6"  # meme compte que tasks/serp-fr.py
GRAINES = {
  "matoulab": ["chat", "chaton", "mon chat", "chat qui", "litiere chat", "croquettes chat",
               "arbre a chat", "jouet chat", "chat sterilise", "chat age", "caisse de transport chat",
               "griffoir chat", "herbe a chat", "chat poil long", "puce chat", "chat appartement",
               "gamelle chat", "harnais chat", "chatiere", "friandise chat"],
  "reptilab": ["pogona", "gecko leopard", "serpent des bles", "gecko a crete", "axolotl", "phasme",
               "terrarium", "python royal", "reptile", "lampe uv terrarium", "tortue terrestre",
               "grillon", "lezard", "cameleon", "grenouille terrarium", "anole"],
}
def call(payload):
    req = urllib.request.Request("https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live",
        data=json.dumps([payload]).encode(),
        headers={"Authorization": "Basic " + base64.b64encode(f"{USER}:{PWD}".encode()).decode(), "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read().decode())
site = sys.argv[1]
out, cout, erreurs = {}, 0.0, []
for g in GRAINES[site]:
    try:
        j = call({"keyword": g, "location_code": 2250, "language_code": "fr", "limit": 300,
                  "include_seed_keyword": True, "order_by": ["keyword_info.search_volume,desc"],
                  "filters": [["keyword_info.search_volume", ">=", 50]]})
        cout += j.get("cost") or 0
        t = j["tasks"][0]
        if t["status_code"] != 20000: erreurs.append((g, t["status_code"], t["status_message"])); continue
        items = (t["result"] or [{}])[0].get("items") or []
        out[g] = [{"kw": i["keyword"], "vol": (i.get("keyword_info") or {}).get("search_volume"),
                   "cpc": (i.get("keyword_info") or {}).get("cpc"),
                   "intent": ((i.get("search_intent_info") or {}).get("main_intent"))} for i in items]
        print(f"{g}: {len(out[g])} requetes")
    except Exception as e:
        erreurs.append((g, "exception", str(e)[:200]))
p = pathlib.Path(__file__).with_name(f"{site}-suggestions.json")
p.write_text(json.dumps(out, ensure_ascii=False, indent=1))
print(f"VERDICT : {sum(len(v) for v in out.values())} requetes sur {len(out)}/{len(GRAINES[site])} graines, cout {cout:.3f} $, erreurs {len(erreurs)} {erreurs}")
