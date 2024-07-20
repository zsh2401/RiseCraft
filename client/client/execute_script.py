import subprocess
import uuid
import tempfile
import os.path
from client.python_call_js import call_js_fn
def execute_script(script,webview,call_id=None):
    """
    创建一个子进程来运行指定的命令，并通过回调函数处理其输出。

    参数:
    command (list): 要运行的命令及其参数，例如 ['ls', '-l']
    stdout_callback (function): 处理标准输出的回调函数
    stderr_callback (function): 处理标准错误的回调函数
    """

    file = os.path.join(tempfile.gettempdir(),str(uuid.uuid4()))
    if os.name == "posix":
        file += ".sh"
        command = ["bash",file]
    else:
        file += ".bat"
        command = ["cmd.exe","/c",file]
        
    with open(file,"w") as f:
        f.write(script)
        
    output = ""
    stderr = ""
    stdout = ""
    
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    while True:
        stdout_line = process.stdout.readline()
        stderr_line = process.stderr.readline()

        if stdout_line == '' and stderr_line == '' and process.poll() is not None:
            break

        if stdout_line:
            output += stdout_line.strip() + "\n"
            stdout += stdout_line.strip() + "\n"
            if call_id is None:
                continue
            try:
                call_js_fn(webview,"onProcessOutputReceived_" + call_id,None,{
                    "callId":call_id,
                    "data":stdout_line.strip(),
                    "source":"stdout"
                })
            except Exception as e:
                print(e)
                
        if stderr_line:
            output += stderr_line.strip() + "\n"
            stderr += stderr_line.strip() + "\n"
            if call_id is None:
                continue
            try:
                call_js_fn(webview,"onProcessOutputReceived_" + call_id,None,{
                    "callId":call_id,
                    "data":stderr_line.strip(),
                    "source":"stderr"
                })
            except Exception as e:
                print(e)
            
    process.stdout.close()
    process.stderr.close()
    process.wait()

    return {
        "code":process.returncode,
        "output":output,
        "stdout":stdout,
        "stderr":stderr
    }