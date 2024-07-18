from time import sleep
from shared.api import download, fetch_full_version
from shared.version_engine.diff import diff
from shared.version_engine.local import read_local
from shared.version_engine.version import Version
from tqdm import tqdm

import subprocess
import os
import webview
from client import Bridge, RiseCraft
from client import call_js_fn_async,call_js_fn
import threading

def gui(target_dir:str,url:str,api:str):
    window = webview.create_window('RiseCraftUpdater', url,width=800, height=600, resizable=False)
    thread = threading.Thread(target=do_update,args=[target_dir,api,window])
    thread.start()
    webview.start()

def do_update(target_dir:str,api:str,webview=None):
    def step(total,percent,step):
        call_js_fn(webview,"onUpgrading",None,{
        "total":total,
        "step":step,
        "percent":percent
    })
    sleep(2)
    print("正在校验文件")
    step(-1,0,"正在校验文件")
    
    v_remote = fetch_full_version(api)
    v_local = read_local(target_dir)
    differences = diff(v_local,v_remote)
    step(len(differences),0,"完成校验")
    
    total = len(differences)
    with tqdm(differences) as _differences:
        current = 0
        for d in _differences:
            current += 1
            step(len(differences),current / total, os.path.basename(d["path"]))
            if d["isFile"]:
                _differences.set_description(f"{d["path"]}")
                download(d["url"],os.path.join(target_dir,d["path"]))
            else:
                _differences.set_description("创建文件")
                os.makedirs(os.path.join(target_dir,d["path"]),exist_ok=True)
    
    step(0,1,"更新完成")
    
    command = os.path.abspath(os.path.join(target_dir,"RiseCraft"))
    cwd = os.path.abspath(target_dir)
    print(command)
    process = subprocess.Popen(command, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True)     

