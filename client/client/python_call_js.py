import asyncio
import json

def call_js_fn(webview,fnName:str,callback=None,*args):
    argsJson = json.dumps(args)
    webview.evaluate_js(
        f"""
        
         new Promise(async (resolve, reject) => {{
            try{{
                const result = await window.RiseCraftFn.{fnName}(...{argsJson})
                resolve({{success:false,result}})
            }}catch(error){{
                resolve({{success:false,error}})  
            }}
        }});
        """, callback
    )
    
async def call_js_fn_async(webview,fnName:str,*args):
    loop = asyncio.get_event_loop()
    future = loop.create_future()
    def callback(result):
        if result["success"]:
            loop.call_soon_threadsafe(future.set_result, result["result"])
        else:
            loop.call_soon_threadsafe(future.set_exception, result["error"])
    call_js_fn(webview,fnName,callback,*args)
    
