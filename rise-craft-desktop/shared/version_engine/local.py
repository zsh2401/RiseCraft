import os
import json
import hashlib

from shared.version_engine.version import FileInfo, Version
def read_local(root_dir,fileList=True,download_prefix:str=None)->Version:
    if os.path.exists(os.path.join(root_dir,"version.json")) == False:
        return {
            "code":0,
            "name": "0.0.1",
            "fileList":[]
        }
    with open(os.path.join(root_dir,"version.json")) as f:
        versionJson = json.loads(f.read())
        return {
            "code":versionJson["code"],
            "name": versionJson["name"],
            "fileList":list_files_and_folders(root_dir,download_prefix) if fileList else []
        }
    
def list_files_and_folders(root_dir,download_prefix:str=None)->list[FileInfo]:
    all_files_and_folders = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for dirname in dirnames:
            entity = {"isFile": False,
                      "md5": None,
                      "path":clean_path(root_dir,os.path.join(dirpath, dirname)),
                      "size":0}
            all_files_and_folders.append(entity)
        for filename in filenames:
            path = os.path.join(dirpath, filename)
            entity = {"isFile": True,
                      "md5": calculate_md5(path),
                      "path":clean_path(root_dir,os.path.join(dirpath, filename)),
                      "size":os.path.getsize(path)}
            if download_prefix is not None:
                entity["url"] = download_prefix + entity["path"]
                
            all_files_and_folders.append(entity)
    return all_files_and_folders

def calculate_md5(file_path):
    # 创建一个md5哈希对象
    md5_hash = hashlib.md5()
    
    # 以二进制模式读取文件并更新哈希对象
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            md5_hash.update(chunk)
    
    # 获取十六进制的MD5哈希值
    return md5_hash.hexdigest()

def clean_path(start:str,full:str):
    cutted = full[len(start):]
    if cutted.startswith("/"):
        return cutted[1:]
    return cutted