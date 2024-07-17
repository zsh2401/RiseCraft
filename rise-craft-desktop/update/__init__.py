from shared.api import download, fetch_full_version
from shared.version_engine.diff import diff
from shared.version_engine.local import read_local
from shared.version_engine.version import Version
from tqdm import tqdm

import subprocess
import os
def do_update(dir:str,api):
    print("正在校验文件")
    v_remote = fetch_full_version(api)
    v_local = read_local(dir)
    differences = diff(v_local,v_remote)
    print("完成校验")
    with tqdm(differences) as _differences:
        for d in _differences:
            if d["isFile"]:
                _differences.set_description(f"{d["path"]}")
                download(api,d["path"],os.path.join(dir,d["path"]))
            else:
                _differences.set_description("创建文件")
                os.makedirs(os.path.join(dir,d["path"]),exist_ok=True)
    
    print("更新完成")
    command = os.path.abspath(os.path.join(dir,"RiseCraft"))
    cwd = os.path.abspath(dir)
    print(command)
    process = subprocess.Popen(command, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True)     

