"""Genera las versiones WebP optimizadas en public/img a partir de assets-src.
Uso: python3 assets-src/build-images.py   (requiere Pillow)"""
from PIL import Image
import os, sys
ROOT=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(ROOT,"..","public","img")
os.makedirs(OUT, exist_ok=True)
SIZES=[480,960,1600]
def save(im, name):
    w,h=im.size
    for s in SIZES:
        if s>=w and s!=SIZES[0]:
            # no agrandar: la última versión es el ancho original
            if s==min(x for x in SIZES if x>=w): 
                im.save(os.path.join(OUT,f"{name}-{s}.webp"),"WEBP",quality=80,method=6); print(name,s,"(orig",w,")")
            continue
        r=im.resize((s,round(h*s/w)),Image.LANCZOS)
        r.save(os.path.join(OUT,f"{name}-{s}.webp"),"WEBP",quality=80,method=6); print(name,s)
def load(n): return Image.open(os.path.join(ROOT,n)).convert("RGB")
save(load("mesa-amigos.png"),"mesa-amigos")
save(load("tostadas-jamon-serrano.png"),"tostadas")
save(load("calientes-ambiente.png"),"calientes-ambiente")
save(load("postres.png"),"postres")
save(load("canastitas-platano.png"),"canastitas")
save(load("carimanola.png"),"carimanola")
save(load("yakitori.png"),"yakitori")
# Recortes de la foto de postres (941x1672)
p=load("postres.png")
crops={
 "cheesecake":(40,110,520,560),
 "mousse":(480,240,941,700),
 "tres-leches":(20,560,540,1050),
 "brownie":(470,640,941,1130),
 "tartaletas":(0,1030,480,1560),
 "flan":(460,1130,941,1640),
}
for n,b in crops.items():
    c=p.crop(b); save(c,n)
# Recorte cuadrado de la mesa para intro FRÍAS/ambiente y OG
og=load("mesa-amigos.png"); w,h=og.size
t=og.crop((0,(h-round(w*630/1200))//2,w,(h+round(w*630/1200))//2)).resize((1200,630),Image.LANCZOS)
t.save(os.path.join(OUT,"..","og.jpg"),"JPEG",quality=82,optimize=True); print("og.jpg")

# Manifiesto para el componente <Picture>
import json, re
m={}
for f in sorted(os.listdir(OUT)):
    mm=re.match(r"(.+)-(\d+)\.webp$", f)
    if mm:
        im=Image.open(os.path.join(OUT,f))
        e=m.setdefault(mm.group(1),{"sources":[],"ratio":round(im.size[0]/im.size[1],4)})
        e["sources"].append({"file":f,"w":im.size[0]})
for e in m.values(): e["sources"].sort(key=lambda s:s["w"])
json.dump(m, open(os.path.join(ROOT,"..","src","content","images.json"),"w"), indent=2)
print("manifest", len(m))
