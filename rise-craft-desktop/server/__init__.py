from flask import send_from_directory
from shared.version_engine.local import read_local

import os
import json
def support_server(dir:str):
    from flask import Flask
    app = Flask(__name__)

    @app.route('/<path:path>')
    def serve_static(path):
        try:
            return send_from_directory(os.path.join(os.getcwd(),dir,"web"), path)
        except:
            return send_from_directory(os.path.join(os.getcwd(),dir,"web"), "index.html")
        
    @app.route('/')
    def index():
        return send_from_directory(os.path.join(os.getcwd(),dir,"web"), "index.html")
    
    @app.route('/api/version')
    def version():
        with open(os.path.join(dir,"version.json")) as f:
            return json.loads(f.read())
    
    @app.route('/api/full-version')
    def full_version():
        return read_local(dir)
    
    @app.route('/api/download/<path:subpath>')
    def download_file(subpath):
        print(os.getcwd())
        directory = os.path.join(os.getcwd(),dir, subpath)
        return send_from_directory(os.path.dirname(directory),os.path.basename(directory))
    
 
    
    app.run(debug=True,port=9999)