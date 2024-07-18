import minecraft_launcher_lib
import subprocess
def launch_mc(options):
        # print(options)
        minecraft_directory = options["gamePath"]
        
        if "fix" in options and options["fix"] == True:
            print("Fixing")
            minecraft_launcher_lib.install.install_minecraft_version(options["baseVersionName"], minecraft_directory,callback)
            print("Fixed")
            
        # print(minecraft_launcher_lib.utils.get_available_versions(minecraft_directory))
        # minecraft_launcher_lib.utils.get_available_versions(minecraft_directory)
        launch_options = {
            "username":options["userName"],
            "executablePath": options["java"],
            "jvmArguments": options["jvmArguments"],
            "launcherName": "RiseCraft",
        }
        if "resolutionWidth" in options["resolutionWidth"]:
            launch_options["resolutionWidth"] = options["resolutionWidth"]
            
        if "resolutionHeight" in options["resolutionHeight"]:
            launch_options["resolutionHeight"] = options["resolutionHeight"]
            
        if "jvmArguments" in options["jvmArguments"]:
            launch_options["jvmArguments"] = options["jvmArguments"]
            
        if "server" in options:
            launch_options["server"] = options["server"]
            
        if "port" in options:
            launch_options["port"] = options["port"]
            
        print(minecraft_directory,options["versionName"])
        minecraft_command:list[str] = minecraft_launcher_lib.command.get_minecraft_command(options["versionName"], minecraft_directory, launch_options)
        print(minecraft_command)
        for i in range(len(minecraft_command)):
        
            if minecraft_command[i] == "-cp":
                cpni = i + 1
                print("cpni",cpni)
            elif minecraft_command[i] == "launchTarget":
                print("launch_target", minecraft_command[i])
        
        # return
        minecraft_command[cpni]= ":".join(list(set(minecraft_command[cpni].split(":"))))
            
        proc = subprocess.call(minecraft_command)
        
def set_status(status: str):
    print(status)


def set_progress(progress: int):
    if current_max != 0:
        print(f"{progress}/{current_max}")


def set_max(new_max: int):
    global current_max
    current_max = new_max
    
callback = {
    "setStatus": set_status,
    "setProgress": set_progress,
    "setMax": set_max
}