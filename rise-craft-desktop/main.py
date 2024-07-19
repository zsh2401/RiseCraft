import sys
import os
import update
import server
from shared.version_engine.local import read_local
from shared.cleaner import clean
import json
import sys
import client.launcher
# os.environ
if len(sys.argv) > 1 and sys.argv[1] == "update":
    update.gui(sys.argv[2],"https://api.mc.zsh2401.top/upgrading","https://api.mc.zsh2401.top")
    # update.gui(sys.argv[2],"http://localhost:5173/upgrading","https://api.mc.zsh2401.top")
elif len(sys.argv) > 1 and sys.argv[1] == "server":
    server.support_server(os.path.abspath(sys.argv[2]),os.path.abspath(sys.argv[3]))
elif len(sys.argv) > 1 and sys.argv[1] == "generate":
    # game dir like
    # prefix like "https://risecraft.oss-rg-china-mainland.aliyuncs.com/RiseCraft/"
    data =  read_local(sys.argv[2],True,sys.argv[3])
    with open("full-version.json","w") as f:
        json.dump(data,f)
elif len(sys.argv) > 1 and sys.argv[1] == "clean":
    clean(os.path.abspath(sys.argv[2]))
else:
    url = "http://localhost:5173" if "DEBUG" in os.environ else "https://api.mc.zsh2401.top"
    # client.launcher.run("https://api.mc.zsh2401.top",os.path.dirname(os.path.abspath(sys.argv[0])))
    client.launcher.run(url,str(os.path.dirname(os.path.abspath(sys.argv[0]))),"https://api.mc.zsh2401.top")
    
    