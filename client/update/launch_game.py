import os
import subprocess
import platform
def launch_game(target_dir):
    system = platform.system()
    
    if system == "Darwin":
        exe = "RiseCraft"
    elif system == "Windows":
        exe = "RiseCraft.exe"
    command = os.path.abspath(os.path.join(target_dir,exe))
    cwd = os.path.abspath(target_dir)
    
    print(command)
    process = subprocess.Popen(command, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True)   