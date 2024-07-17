import requests
import json
import os

from shared.version_engine.version import Version
def fetch_full_version(serverURL:str)->Version:
    resp  = requests.get(serverURL + "/full-version")
    return resp.json()

def fetch_version_info(serverURL:str)->Version:
    resp  = requests.get(serverURL + "/version")
    return resp.json()

def download(serverURL:str,path, dest):
    resp = requests.get(serverURL + f"/download/{path}")
    # 检查请求是否成功
    if resp.status_code == 200:
        # 确保目标文件夹存在
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        
        # 以二进制模式写入文件
        with open(dest, 'wb') as f:
            for chunk in resp.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
    else:
        raise Exception(f"Failed to download file. Status code: {resp.status_code}")