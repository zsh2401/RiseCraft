#!/usr/bin/env python
import json
from packaging.version import Version
with open("version.json","r") as f:
    obj = json.load(f)
    v =  Version(obj["name"])
    
    obj["code"] += 1
    newV = f"{v.major}.{v.minor}.{v.micro + 1}"
     
    obj["name"] = str(newV)

print(obj)
with open("version.json","w") as f:
    json.dump(obj,f)