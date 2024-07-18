
from portablemc.standard import Context, Version,QuickPlayMultiplayer,Watcher,StreamRunner, XmlStreamEvent
from portablemc.forge import ForgeVersion
# from portablemc.util import QuickPlay
from pathlib import Path
import os
from .python_call_js import call_js_fn

class MyWatcher(Watcher):
    def __init__(self,webview) -> None:
        super().__init__()
        self.webview = webview
        
    def handle(self, event: any, *args, **kwargs) -> None:
        if isinstance(event, XmlStreamEvent):
            r = event.message
        else:
            r = str(event)
            
        call_js_fn(self.webview,"onInstalling", None,r)
        
class MyRunner(StreamRunner):
    def __init__(self,webview) -> None:
        super().__init__()
        self.webview = webview
        
    def process_stream_event(self, event: any) -> None:
        if isinstance(event, XmlStreamEvent):
            r = event.message
        else:
            r = event
        call_js_fn(self.webview,"onLaunching", None,r)
            
def launch_mc_2(options,webview):
    context = Context(Path(options["gamePath"]))
    # context.wa
    version = ForgeVersion("1.18.2-40.2.21", context=context)
    version.jvm_path = Path(options["java"])
    # version.set
    version.set_auth_offline(options["userName"],None)
    version.fixes[Version.FIX_LWJGL] = "3.3.2"
    if "server" in options:
        version.quick_play = QuickPlayMultiplayer(
            options["server"],
            options["port"] if "port" in options else 25565
        )
    version.resolution = (options["resolutionWidth"],options["resolutionHeight"])
    env = version.install(watcher=MyWatcher(webview))
    # env.
    env.run(MyRunner(webview))
    