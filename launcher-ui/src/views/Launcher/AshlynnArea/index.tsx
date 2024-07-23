
import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react'
import "./index.scss"
import { Button, Input, Slider, SliderSingleProps } from 'antd'
import { Status } from '../Stauts'
import icon from "./pickaxe.jpg"
import { isBlankOrNullOrEmpty } from 'sz-react-support'
import { PlayCircleOutlined } from '@ant-design/icons'
import { MemorySelector } from './MemorySelector'
export function AshlynnArea() {
    const [appData, setAppData] = useState<string>()
    const [java, setJava] = useState<string>()

    const [xmxG, setXmxG] = useState(8)
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
                versionName: "1.20.1-47.3.0",
                userName: userName!,
                jvmArguments: [`-Xmx${xmxG}G`],
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
    }, [appData, java, userName, valid, xmxG])

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



    return <div className='ashlynn'>
        <div className='pad'>
            <Input onKeyUp={onKeyUp} autoCapitalize='off' autoComplete='off' size='large' value={userName} onChange={e => setUserName(e.target.value)} placeholder='请输入玩家名' />
            <p className='desc'>仅英文，数字与下划线，至少三位</p>
            {
                running ? <Button style={{
                    height: 60,

                }} block size='large' danger onClick={kill}>关闭游戏</Button> :
                    <Button
                        icon={
                            <PlayCircleOutlined />
                            // <img style={{height:"20px",borderRadius:"5px"}} src={icon}></img>
                        }
                        style={{ height: 60, background: "green" }}
                        disabled={!valid} loading={running} block size='large' type='primary' onClick={launch}>
                        启动游戏
                    </Button>
            }
            <MemorySelector onSelect={(G) => setXmxG(G)} />
        </div>
    </div>
}
