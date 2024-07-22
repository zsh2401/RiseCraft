import webview
import webview.js

from .apply_must_options import apply_must_options
from .native import Bridge, RiseCraft

def gui_launcher(url,root_dir,api):
    apply_must_options(root_dir)
    bridge = Bridge()
    win = webview.create_window('RiseCraft', url, js_api=bridge,
                                width=1280,height=720)
    bridge.register("RiseCraft", RiseCraft(root_dir,api,win))
    webview.start()
