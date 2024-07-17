import webview

def run(url,root_dir):
    from .native import Bridge, RiseCraft
    bridge = Bridge()
    bridge.register("RiseCraft", RiseCraft(root_dir,url))
    webview.create_window('RiseCraft', url, js_api=bridge)
    webview.start()
