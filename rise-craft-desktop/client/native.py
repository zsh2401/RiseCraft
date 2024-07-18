import platform
import uuid
import minecraft_launcher_lib
import os
import subprocess
import json
from shared.api import fetch_version_info
from .start_update_process import start_update_process
from .launch_mc import launch_mc
from shared.version_engine.local import read_local
class Bridge:
    def __init__(self) -> None:
        self.registry = {}
        
    def register(self, ns:str,obj:any):
        self.registry[ns] = obj
    
    def ns(self,ns,fn,args):
        try:
            obj = self.registry[ns]
            return getattr(obj,fn)(*args)
        except BaseException as e:
            print(e)
            raise e
    
class RiseCraft:
    def __init__(self,root_dir,api_url):
        self.root_dir = root_dir
        self.api_url = api_url
    
    def save(self,key,value):
        os.makedirs(os.path.join(self.root_dir,"data"),exist_ok=True)
        with open(os.path.join(self.root_dir,"data",key + ".rcd"),"w",encoding="utf-8") as f:
            json.dump(value,f)
        
    def read(self,key):
        os.makedirs(os.path.join(self.root_dir,"data"),exist_ok=True)
        try:
            with open(os.path.join(self.root_dir,"data",key + ".rcd"),"r",encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(e)
            return None
            
    def version(self):
        return read_local(self.root_dir,False)
    
    def getJavaPaths(self):
        system = platform.system().lower()
        machine = platform.machine().lower()
        if system == "windows" and machine.endswith("64"):
            machine = "amd64"
        bin = f"{self.root_dir}/jre/{system}/{machine}/bin"
        if platform.system().lower() != "windows":
            os.system(f"chmod +x {bin}/*")

        return [f"{bin}/java"]
    
    def appDataDir(self):
        return self.root_dir
    
    def isUpgradable(self):
        code = read_local(self.root_dir,False)["code"]
        remoteCode = fetch_version_info(self.api_url)["code"]
        print(code,remoteCode)
        return code < remoteCode
    
    def performUpgrade(self):
        start_update_process(self.root_dir)
    
    def exitLauncher(self,code):
        os._exit(code)
        
    def launch(self,options):
        launch_mc(options)

