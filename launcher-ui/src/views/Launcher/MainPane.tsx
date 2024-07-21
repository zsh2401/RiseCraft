
import { useCallback, useEffect, useState } from 'react'
import "./content.scss"
import { Button, Input } from 'antd'
import { Status } from './Stauts'
export function Content() {
    const [appData, setAppData] = useState<string>()
    const [java, setJava] = useState<string>()
    const [failed, setFailed] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>()
    const [launching, setLaunching] = useState(false)

    useEffect(() => {
        (async () => {
            setAppData(await window.RiseCraft.appDataDir())
        })()
    }, [])

    const kill = useCallback(()=>{
        window.RiseCraft.kill()
    },[])
    const launch = useCallback(async () => {
        try {
            setLaunching(true)
            if (!java || !userName) {
                return
            }
            await window.RiseCraft.launch({
                java,
                versionName: "1.20.1-47.3.0",
                userName,
                // server:"110.42.38.188",
                // port:25565,
                jvmArguments: ["-Xmx4096m"],
                baseVersionName: "1.20.1",
                resolutionHeight: 720,
                resolutionWidth: 1280,
                gamePath: appData + "/files/.minecraft"
            })
            setFailed(true)
        } catch (err) {
            alert(err)
        } finally {
            setLaunching(false)
        }
    }, [appData, java, userName])

    const launched = useCallback(async () => {
        // await window.RiseCraft.exitLauncher(0)
    }, [])

    useEffect(() => {
        (async () => {
            setJava((await window.RiseCraft.getJavaPaths())[0])
        })()
    }, [])

    return <div className='content'>
        <h1>RiseCraft X</h1>
        <h3>Have fun!</h3>
        <div className='pad'>
            <Input value={userName} onChange={e => setUserName(e.target.value)} placeholder='用户名' />
            <br /><br />
            <Button size='large' danger onClick={kill}>关闭</Button>
            <Button loading={launching} size='large' type='primary' onClick={launch}>启动</Button>
        </div>
        {
            (launching || failed) && <Status successLaunched={launched} />
        }
    </div>
}