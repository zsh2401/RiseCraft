# import minecraft_launcher_lib

# current_max = 0


# def set_status(status: str):
#     print(status)


# def set_progress(progress: int):
#     if current_max != 0:
#         print(f"{progress}/{current_max}")


# def set_max(new_max: int):
#     global current_max
#     current_max = new_max


# minecraft_directory = minecraft_launcher_lib.utils.get_minecraft_directory()

# callback = {
#     "setStatus": set_status,
#     "setProgress": set_progress,
#     "setMax": set_max
# }

# minecraft_launcher_lib.install.install_minecraft_version("1.18.2", "./fake-local", callback=callback)
# forge_version = minecraft_launcher_lib.forge.find_forge_version("1.18.2")
# print("installing forge")
# minecraft_launcher_lib.forge.install_forge_version(forge_version, "./fake-local",)
# # print(forge_version)
# from client.native import RiseCraft
# RiseCraft(".",".").save("a",{"code":1})
# print(RiseCraft(".",".").read("a"))

from portablemc.standard import Context, Version
from portablemc.forge import ForgeVersion
from pathlib import Path

context = Context(Path( "/Users/zsh2401/Games/MineCraft/.minecraft"))
version = ForgeVersion("1.18.2-40.2.21", context=context)
version.jvm_path = Path( "/Users/zsh2401/Sources/RiseCraft/rise-craft-desktop/jre/darwin/arm64/bin/java")
version.set_auth_offline("zsh2401",None)
version.fixes[Version.FIX_LWJGL] = "3.3.2"
env = version.install()
env.run()