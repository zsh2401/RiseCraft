import shutil
import os
import pathlib

def clean(root_dir):
    path = pathlib.Path(root_dir)
    minecraft_path = path / "game" / ".minecraft"
    ensure_delete(minecraft_path / "logs")
    ensure_delete(minecraft_path / "crash-reports")

def ensure_delete(path:pathlib.Path):
    path = str(path)
    """
    删除给定路径，无论是文件还是文件夹。如果路径不存在，则打印相应信息。
    
    参数:
    path (str): 要删除的文件或文件夹路径。
    """
    try:
        if os.path.exists(path):
            if os.path.isfile(path):
                os.remove(path)
                print(f'文件 {path} 已被删除。')
            elif os.path.isdir(path):
                shutil.rmtree(path)
                print(f'文件夹 {path} 已被删除。')
        else:
            print(f'路径 {path} 不存在。')
    except Exception as e:
        print(f'删除路径 {path} 时发生错误：{e}')
