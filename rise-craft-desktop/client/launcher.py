import webview
import webview.js
from .native import Bridge, RiseCraft

def run(url,root_dir,api):
    bridge = Bridge()
    win = webview.create_window('RiseCraft', url, js_api=bridge,
                                width=1280,height=720)
    bridge.register("RiseCraft", RiseCraft(root_dir,api,win))
    webview.start()
