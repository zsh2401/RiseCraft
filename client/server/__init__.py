from flask import send_from_directory
from shared.version_engine.local import read_local

import os
import json
import time
import requests


def support_server(oss:str,webDir):
    from flask import Flask
    app = Flask(__name__)
    
    record = {
        "data":None,
        "lastTime":0
    }
    def get_full_version():
        if (record["data"] is None) or ((time.time() - record["lastTime"]) > 3600):
            print("refresh full version cache")
            record["lastTime"] = time.time()
            resp = requests.get(oss)
            record["data"] = resp.json()
        return record["data"]

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
            "code":get_full_version()["code"],
            "name":get_full_version()["name"]
        }
    
    @app.route('/api/full-version')
    def full_version():
        return get_full_version()
        # return read_local(rootDir,True,"https://risecraft.oss-rg-china-mainland.aliyuncs.com/RiseCraft/")
    
    # @app.route('/api/download/<path:subpath>')
    # def download_file(subpath):
    #     print(os.getcwd())
    #     directory = os.path.join(os.getcwd(),rootDir, subpath)
    #     return send_from_directory(os.path.dirname(directory),os.path.basename(directory))
    
 
    
    app.run(port=9999)