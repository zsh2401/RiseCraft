import os
import shutil
import json
import pprint
with open("assets/minecraft/lang/zh_cn.json","r",encoding="utf-8") as f:
    obj = json.load(f)

ROOT = "./src_audios"
for dirpath, dirnames, filenames in os.walk(ROOT):
    for file in filenames:
        src = os.path.join(dirpath,file)
        relative = os.path.join(dirpath)[len(ROOT) + 1:]
        ogg_name = file.split(".ogg")[0]
    
        dest = os.path.join("assets/minecraft/sounds/",relative,ogg_name + ".ogg")
        
        os.makedirs(os.path.dirname(dest),exist_ok=True)
        
        # 修改语言文件
        # print(dest)
        if dest.find("sounds/records") != -1:
            music_name = os.path.splitext(os.path.basename(file.split(".ogg.")[1]))[0]
            obj[f"item.minecraft.music_disc_{ogg_name}.desc"] = music_name
            # print("modifing " + f"item.minecraft.music_disc_{ogg_name}.desc")
        # continue
    
        # 背景音降低音量
        # 这个参数能正常播放，并且可以转换一切，包括mp3,mp4等等
        if dest.find("music/game") != -1:
            command = f'ffmpeg -y  -vn -i "{src}" -af "volume=0.2" -c:a libvorbis -b:a 112k -ar 44100 -ac 2 "{dest}"'
        else:
            command = f'ffmpeg -y -vn -i "{src}" -c:a libvorbis -b:a 112k -ar 44100 -ac 2 "{dest}"'
        print(command)
        
        os.system(command)
    
 
with open("assets/minecraft/lang/zh_cn.json","w",encoding="utf-8") as f:
    # json.dump(obj,f,ensure_ascii=False)
    str = json.dumps(obj,ensure_ascii=False,indent=4)
    # pprint.pprint(str)
    # print(str)
    f.write(str)