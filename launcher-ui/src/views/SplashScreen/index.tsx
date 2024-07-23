import { useCallback, useEffect, useState } from "react"
import "./index.scss"
import { useNavigate } from "react-router"
import { executeTasks } from "../../launching"
import { prepareForBridge } from "../../Bridge"
import { sleep } from "sz-react-support"
export function SplashScreen() {
    const navigate = useNavigate()

    const [stage, setStage] = useState("加载中")
    const leaveThere = useCallback(async () => {
        setStage("欢迎！")
        await sleep(1000)
        navigate("/launching")
    }, [navigate])

    const load = useCallback(async () => {
        // alert("loading")
        setStage("加载中")
        await prepareForBridge()
        setStage("执行额外脚本任务")
        await executeTasks()
        setStage("检查更新中")
        try {
            const should = await window.RiseCraft.isUpgradable()
            if (should) {
                await window.RiseCraft.performUpgrade()
            } else {
                leaveThere()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err instanceof Error) {
                alert("无法检查更新:" + err.message)
            } else {
                alert("无法检查更新:" + JSON.stringify(err))
            }
            leaveThere()
        }
    }, [leaveThere,setStage])

    // useMounted
    useEffect(() => {
        load()
    }, [load])

    return <div className="updater">
        <div className="inner">
            <div>
                <h1 className="name">Rise Craft 2024</h1>
                <p className="stage">
                    {stage}
                </p>
            </div>
        </div>

    </div>
}