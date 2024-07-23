import { useCallback, useEffect, useState } from "react"
import { UpdateProgressEvent } from "../../risecraft"
import { prepareForBridge } from "../../Bridge"

export function Upgrading() {
    const [prepared, setPrepared] = useState(false)
    const [progress, setProgress] = useState<UpdateProgressEvent>({
        total: 0,
        step: "准备更新",
        percent: 0,
    })
    const cb = useCallback((e: UpdateProgressEvent) => {
        setProgress(e)
    }, [setProgress])
    
    useEffect(() => {
        (async () => {
            await prepareForBridge()
            setPrepared(true)
        })()
    }, [setPrepared])

    useEffect(() => {
        if (!prepared) {
            return
        }
        window.RiseCraftFn.onUpgrading = cb
        return () => {
            delete window.RiseCraftFn.onUpgrading
        }
    }, [cb, prepared])
    return <div>{(progress.percent * 100).toFixed(2)}% {progress.step}</div>
}