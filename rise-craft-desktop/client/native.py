import platform
import uuid
import minecraft_launcher_lib
import os
import subprocess

from shared.api import fetch_version_info
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
    
    def getJavaPaths(self):
        # if os.
        system = platform.system().lower()
        machine = platform.machine().lower()
        if system == "windows" and machine.endswith(64):
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
        return code < remoteCode
    
    def performUpgrade(self):
        import tempfile
        import shutil
        tmp = tempfile.gettempdir()
        src = os.path.abspath(os.path.join(self.root_dir,"RiseCraft"))
        dest = os.path.join(tmp,"RiseCraft" + str(uuid.uuid4()))
        print(src,dest)
        shutil.copy(src,dest)
        there = os.path.abspath(self.root_dir)
        command = f"{dest} update \"{there}\""
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True)
        os._exit(0)
    
    def exitLauncher(self,code):
        os._exit(code)
        
    def launch(self,options):
        print(options)
        minecraft_directory = options["gamePath"]
        print("Installing")
        # minecraft_launcher_lib.install.install_minecraft_version(options["baseVersionName"], minecraft_directory,callback)
        print("Installed")
        print(minecraft_launcher_lib.utils.get_available_versions(minecraft_directory))
        minecraft_launcher_lib.utils.get_available_versions(minecraft_directory)
        options["executablePath"] = options["java"]
        options["gameDirectory"] = options["gamePath"]
        minecraft_command = minecraft_launcher_lib.command.get_minecraft_command(options["versionName"], minecraft_directory, options)
        proc = subprocess.Popen(minecraft_command)


def set_status(status: str):
    print(status)


def set_progress(progress: int):
    if current_max != 0:
        print(f"{progress}/{current_max}")


def set_max(new_max: int):
    global current_max
    current_max = new_max
    
callback = {
    "setStatus": set_status,
    "setProgress": set_progress,
    "setMax": set_max
}