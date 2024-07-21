
import { useCallback, useEffect, useState } from 'react'
import "./MainPane.scss"
import { Button, Input } from 'antd'
import { Status } from './Stauts'
import { isBlankOrNullOrEmpty } from 'sz-react-support'
export function MainPane() {
    const [appData, setAppData] = useState<string>()
    const [java, setJava] = useState<string>()
    const [valid,setValid] = useState<boolean>(false)
    const [launchedOnce, setLaunchedOnce] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>()
    const [running, setLaunching] = useState(false)

    useEffect(()=>{
        if(isBlankOrNullOrEmpty(userName)){
            setValid(false)
            return
        }
    },[setValid,userName])

    useEffect(() => {
        (async () => {
            setAppData(await window.RiseCraft.appDataDir())
        })()
    }, [])

    const kill = useCallback(() => {
        window.RiseCraft.kill()
    }, [])
    const launch = useCallback(async () => {
        try {
            setLaunching(true)
            if (!java || !userName) {
                return
            }
            setLaunchedOnce(true)
            await window.RiseCraft.launch({
                java,
                versionName: "1.20.1-47.3.0",
                userName,
                // server:"110.42.38.188",
                // port:25565,
                jvmArguments: ["-Xmx8192m"],
                baseVersionName: "1.20.1",
                resolutionHeight: 720,
                resolutionWidth: 1280,
                gamePath: appData + "/files/.minecraft"
            })
            setLaunchedOnce(true)
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
        <div className='centre'>
            <div>
                {/* <h1>RiseCraft X</h1>
                <h3>Have fun!</h3> */}
            </div>
            <div className='pad'>
                <h2 className='title'>Rise Craft</h2>
                <br/>
                <Input size='large' value={userName} onChange={e => setUserName(e.target.value)} placeholder='请输入玩家名' />
                <p className='desc'>仅英文，数字与下划线，至少三位</p>
                <br /><br />
                {
                    running ? <Button block size='large' danger onClick={kill}>关闭</Button> :
                        <Button disabled={isBlankOrNullOrEmpty(userName)}  loading={running} block size='large' type='primary' onClick={launch}>启动游戏</Button>
                }
            </div>
            {
                (running || launchedOnce) && <Status successLaunched={launched} />
            }
        </div>
        {/* <HWCenter/> */}


    </div>
}