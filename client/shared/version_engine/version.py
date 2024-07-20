
from typing import TypedDict


class FileInfo(TypedDict):
    isFile:bool
    md5:str
    path:str
    size:int | None

class Version(TypedDict):
    code:int
    name:str
    fileList:list[FileInfo] | None
        
    
  