import sys
import os
import update
import server
import client.launcher
if len(sys.argv) > 1 and sys.argv[1] == "update":

    update.gui(sys.argv[2],"https://api.mc.zsh2401.top/upgrading","https://api.mc.zsh2401.top")
    # update.gui(sys.argv[2],"http://localhost:5173/upgrading","https://api.mc.zsh2401.top")
elif len(sys.argv) > 1 and sys.argv[1] == "server":
    server.support_server(os.path.abspath(sys.argv[2]),os.path.abspath(sys.argv[3]))
else:
    # client.launcher.run("https://api.mc.zsh2401.top",os.path.dirname(os.path.abspath(sys.argv[0])))
    client.launcher.run("https://api.mc.zsh2401.top",str(os.path.dirname(os.path.abspath(sys.argv[0]))),"https://api.mc.zsh2401.top")
    
    