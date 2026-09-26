#!/usr/bin/env python3
"""Volume Google exact (France) de la liste de sujets retenus : Google Ads search_volume,
UN appel pour toute la liste. Entree : sujets.tsv (slug, pilier, requete, rayon Maxi Zoo, titre).
Sortie : sujets-volumes.tsv. Usage : python3 volumes.py <dossier mots-cles>"""
import base64, json, sys, urllib.request, pathlib, csv
USER, PWD = "remy@remyzaoui.com", "5be015b2fe6a43f6"
dos = pathlib.Path(sys.argv[1])
rows = list(csv.reader(open(dos / "sujets.tsv"), delimiter="\t"))
kws = sorted({r[2] for r in rows})
req = urllib.request.Request("https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
    data=json.dumps([{"keywords": kws, "location_code": 2250, "language_code": "fr"}]).encode(),
    headers={"Authorization": "Basic " + base64.b64encode(f"{USER}:{PWD}".encode()).decode(), "Content-Type": "application/json"})
j = json.loads(urllib.request.urlopen(req, timeout=300).read())
t = j["tasks"][0]
if t["status_code"] != 20000: sys.exit(f"ECHEC {t['status_code']} {t['status_message']}")
vol = {i["keyword"]: (i.get("search_volume"), i.get("cpc")) for i in (t["result"] or [])}
with open(dos / "sujets-volumes.tsv", "w") as f:
    for r in rows:
        v, c = vol.get(r[2], (None, None))
        f.write("\t".join(r + [str(v if v is not None else "?"), f"{c or 0:.2f}"]) + "\n")
manq = [k for k in kws if vol.get(k, (None,))[0] is None]
print(f"VERDICT : {len(kws)} requetes mesurees, {len(manq)} sans donnee {manq}, cout {j.get('cost')} $")
