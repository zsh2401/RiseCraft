import webview

def run(root_dir):
    from .native import Bridge, RiseCraft
    bridge = Bridge()
    bridge.register("RiseCraft", RiseCraft(root_dir))
    webview.create_window('Hello world', 'http://localhost:5173', js_api=bridge)
    webview.start(debug=True)
