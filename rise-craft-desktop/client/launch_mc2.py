
from portablemc.standard import Context, Version,QuickPlayMultiplayer
from portablemc.forge import ForgeVersion
# from portablemc.util import QuickPlay
from pathlib import Path

def launch_mc_2(options):
    context = Context(Path(options["gamePath"]))
    version = ForgeVersion("1.18.2-40.2.21", context=context)
    version.jvm_path = Path(options["java"])
    version.set_auth_offline(options["userName"],None)
    version.fixes[Version.FIX_LWJGL] = "3.3.2"
    if "server" in options:
        version.quick_play = QuickPlayMultiplayer(
            options["server"],
            options["port"] if "port" in options else 25565
        )
    version.resolution = (options["resolutionWidth"],options["resolutionHeight"])
    env = version.install()
    env.run()