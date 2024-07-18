from flask import send_from_directory
from shared.version_engine.local import read_local

import os
import json
def support_server(fullVersionFile:str,webDir):
    with open(fullVersionFile,"r") as f:
        fullVersion = json.load(f)
        
    from flask import Flask
    app = Flask(__name__)

    @app.route('/<path:path>')
    def serve_static(path):
        print(webDir)
        try:
            return send_from_directory(webDir, path)
        except:
            return send_from_directory(webDir, "index.html")
        
    @app.route('/')
    def index():
        return send_from_directory(webDir, "index.html")
    
    @app.route('/api/version')
    def version():
        return {
            "code":fullVersion["code"],
            "name":fullVersion["name"]
        }
    
    @app.route('/api/full-version')
    def full_version():
        return fullVersion
        # return read_local(rootDir,True,"https://risecraft.oss-rg-china-mainland.aliyuncs.com/RiseCraft/")
    
    # @app.route('/api/download/<path:subpath>')
    # def download_file(subpath):
    #     print(os.getcwd())
    #     directory = os.path.join(os.getcwd(),rootDir, subpath)
    #     return send_from_directory(os.path.dirname(directory),os.path.basename(directory))
    
 
    
    app.run(port=9999)