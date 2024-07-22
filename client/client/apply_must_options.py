import os
import shutil
def apply_must_options(root_dir):
    original_file_path = os.path.join(root_dir,"files","options.original.txt")
    must_file_path = os.path.join(root_dir,"files","options.must.txt")
    target_file_path = os.path.join(root_dir,"files",".minecraft","options.txt")
    
    if os.path.exists(target_file_path) == False:
        shutil.copyfile(original_file_path,target_file_path)
        
    must = parse(must_file_path)
    target = parse(target_file_path)
    
    for key in must:
        target[key] = must[key]
        
    save(target,target_file_path)
    
        
def parse(file):
    result = {}
    with open(file,"r") as f:
        lines = f.readlines()
        for line in lines:
            line = line.strip()
            s = line.split(":")
            key = s[0]
            value = s[1]
            result[key] = value
    return result
            
def save(options,file_path):
    content = ""
    for key in options:
        content += f"{key}:{options[key]}" + os.linesep
    with open(file_path,"w") as f:
        f.write(content)