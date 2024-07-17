import client.launcher
import server
import update
import sys
import os
if len(sys.argv) > 1 and sys.argv[1] == "update":
    update.do_update(sys.argv[2],"http://127.0.0.1:9999")
elif len(sys.argv) > 1 and sys.argv[1] == "server":
    server.support_server(os.path.dirname(os.path.abspath(sys.argv[0])))
else:
    client.launcher.run(os.path.dirname(os.path.abspath(sys.argv[0])))