import sys
import os
if len(sys.argv) > 1 and sys.argv[1] == "update":
    import update
    update.do_update(sys.argv[2],"https://api.mc.zsh2401.top")
elif len(sys.argv) > 1 and sys.argv[1] == "server":
    import server
    server.support_server(os.path.dirname(os.path.abspath(sys.argv[0])),os.path.abspath(sys.argv[2]))
else:
    import client.launcher
    client.launcher.run("https://api.mc.zsh2401.top",os.path.dirname(os.path.abspath(sys.argv[0])))