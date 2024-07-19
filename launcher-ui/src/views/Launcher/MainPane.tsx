
import { useCallback, useEffect, useState } from 'react'
import "./content.scss"
import { Button, Input } from 'antd'
import { Status } from './Stauts'
export function Content() {
    const [appData, setAppData] = useState<string>()
    const [java, setJava] = useState<string>()
    const [failed,setFailed ] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>()
    const [launching, setLaunching] = useState(false)

    useEffect(()=>{
        (async ()=>{
            setAppData(await window.RiseCraft.appDataDir())
            // await window.RiseCraft.hide(
        })()
    },[])
    const launch = useCallback(async () => {
        try {
            setLaunching(true)
            if (!java || !userName) {
                // alert("找不到Java或")
                return
            }
            // alert("what?")
            await window.RiseCraft.launch({
                java,
                versionName: "1.18.2-40.2.21",
                userName,
                jvmArguments: ["-Xmx4096m"],
                baseVersionName: "1.18.2",
                resolutionHeight: 600,
                resolutionWidth: 800,
                // server: "ip.mc.qqq",
                // port: 123,
                gamePath: appData + "/game/.minecraft"
            })
            setFailed(true)
        } catch(err){
            alert(err)
        } finally {
            setLaunching(false)
        }
    }, [appData, java, userName])

    const launched = useCallback(async () => {
        await window.RiseCraft.exitLauncher(0)
    }, [])

    useEffect(() => {
        (async () => {
            setJava((await window.RiseCraft.getJavaPaths())[0])
        })()
    }, [])

    return <div className='content'>
        <h1>RiseCraft X</h1>
        <h3>Have fun!</h3>
        <a target="_blank" href='https://baidu.com'>WOw</a>
        <div className='pad'>
            <Input value={userName} onChange={e => setUserName(e.target.value)} placeholder='用户名' />
            <br /><br />
            <Button loading={launching} size='large' type='primary' onClick={launch}>启动</Button>
        </div>
        {navigator.userAgent}
        {
            (launching || failed) && <Status successLaunched={launched} />
        }
    </div>
}