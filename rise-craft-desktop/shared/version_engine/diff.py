from typing import TypedDict
from shared.version_engine.version import FileInfo, Version
class Difference(TypedDict):
    type: str
    path: str
    isFile: bool

def diff(local:Version,remote:Version)->list[Difference]:
    result:list[Difference] = []
    flatLocal = flat(local["fileList"])
    flatRemote = flat(remote["fileList"]) 
    for path,remoteFile in flatRemote.items():
        if path not in flatLocal:
            result.append({
                "type":"not-exist",
                "path":path,
                "isFile":remoteFile["isFile"]
            })
        elif remoteFile["md5"] != flatLocal[path]["md5"] :
            result.append({
                "type":"not-same",
                "path":path,
                "isFile":remoteFile["isFile"]
            })
    return result

def flat(files:list[FileInfo])->dict[str,FileInfo]:
    r = {}
    for f in files:
        r[f["path"]] = f
    return r