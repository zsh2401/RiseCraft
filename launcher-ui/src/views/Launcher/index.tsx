
import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react'
import "./index.scss"
import { Button, Input } from 'antd'
import { Status } from './Stauts'
import { isBlankOrNullOrEmpty } from 'sz-react-support'
export function Launcher() {
    const [appData, setAppData] = useState<string>()
    const [java, setJava] = useState<string>()
    const [valid, setValid] = useState<boolean>(false)
    const [launchedOnce, setLaunchedOnce] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>()
    const [running, setLaunching] = useState(false)

    useEffect(() => {
        if (isBlankOrNullOrEmpty(userName)) {
            setValid(false)
            return
        }
        if (userName!.length < 3) {
            setValid(false)
            return
        }
        if (!/^[a-zA-Z0-9_]+$/.test(userName!)) {
            setValid(false)
            return
        }
        window.RiseCraft.save("userName", userName)
        setValid(true)
    }, [setValid, userName])

    useEffect(() => {
        (async () => {
            setAppData(await window.RiseCraft.appDataDir())
            setUserName(await window.RiseCraft.read<string>("userName") ?? void 0)
        })()
    }, [])

    const kill = useCallback(() => {
        window.RiseCraft.kill()
    }, [])
    const launch = useCallback(async () => {
        try {
            setLaunching(true)
            if (!java || !valid) {
                return
            }

            setLaunchedOnce(true)
            await window.RiseCraft.launch({
                java,
                versionName: "1.20.1-47.3.5",
                userName:userName!,
                // server:"110.42.38.188",
                // port:25565,
                jvmArguments: ["-Xmx4096m"],
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
    }, [appData, java, userName, valid])

    useEffect(() => {
        (async () => {
            setJava((await window.RiseCraft.getJavaPaths())[0])
        })()
    }, [])

    const onKeyUp = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            launch()
        }
    }, [launch])

    return <div className='launcher'>
        <div className='centre'>
            <div>
                {/* <h1>RiseCraft X</h1>
                <h3>Have fun!</h3> */}
                <iframe style={{
                    width:"800px",
                    height:"300px"
                }} src="http://110.42.38.188:8123/"/>
            </div>
            <div className='pad'>
                <h2 className='title'>Rise Craft</h2>
                <br />
                <Input onKeyUp={onKeyUp} autoCapitalize='off' autoComplete='off' size='large' value={userName} onChange={e => setUserName(e.target.value)} placeholder='请输入玩家名' />
                <p className='desc'>仅英文，数字与下划线，至少三位</p>
                <br /><br />
                {
                    running ? <Button block size='large' danger onClick={kill}>关闭</Button> :
                        <Button disabled={!valid} loading={running} block size='large' type='primary' onClick={launch}>启动游戏</Button>
                }
            </div>

        </div>
        <Status />
    </div>
}