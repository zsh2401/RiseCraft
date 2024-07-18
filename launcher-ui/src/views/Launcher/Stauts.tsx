/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"

export function Status(props: {
    successLaunched: () => void
    onLaunchFailed: () => void
}) {
    const [raw, setRaw] = useState<any>()
    const [stage, setStage] = useState("")
    const onLaunching = useCallback((e: any) => {
        setRaw(e)
        setStage("启动中")
        if (`${e}`.includes("MinecraftForge") &&
            `${e}`.includes("Initialized")
        ) {
            props.successLaunched()
        }
    }, [props])

    const onInstalling = useCallback((e: any) => {
        setRaw(e)
        setStage("安装中")
    }, [])

    useEffect(() => {
        window.RiseCraftFn.onLaunching = onLaunching
        window.RiseCraftFn.onInstalling = onInstalling
        return () => {
            delete window.RiseCraftFn.onLaunching
            delete window.RiseCraftFn.onLaunching
        }
    }, [onInstalling, onLaunching])

    return <div style={{ background: "green" }}>
        {stage}: {raw}
    </div>
}