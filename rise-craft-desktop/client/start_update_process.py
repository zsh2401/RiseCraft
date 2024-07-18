import tempfile
import shutil
import os
import subprocess
import uuid
import platform
def start_update_process(root_dir):
    tmp = tempfile.gettempdir()
    system = platform.system()
    
    if system == "Darwin":
        src = os.path.abspath(os.path.join(root_dir,"RiseCraft"))
    elif system == "Windows":
        src = os.path.abspath(os.path.join(root_dir,"RiseCraft.exe"))
        
    dest = os.path.join(tmp,"RiseCraft" + str(uuid.uuid4()) + ".exe")
    shutil.copy(src,dest)
    there = os.path.abspath(root_dir)
    command = [dest,"update",there]
    process = subprocess.Popen(command, start_new_session=True)
    os._exit(0)