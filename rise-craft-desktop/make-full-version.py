from shared.version_engine.local import read_local
import json
import sys
data =  read_local(sys.argv[1],True,"https://risecraft.oss-rg-china-mainland.aliyuncs.com/RiseCraft/")
with open("full-version.json","w") as f:
    json.dump(data,f)