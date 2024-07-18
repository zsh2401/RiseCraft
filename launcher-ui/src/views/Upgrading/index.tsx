import { useCallback, useEffect, useState } from "react"
import { UpdateProgressEvent } from "../../risecraft"

export function Upgrading() {
    const [progress, setProgress] = useState<UpdateProgressEvent>({
        total: 0,
        step: "准备更新",
        percent: 0,
    })
    const cb = useCallback((e: UpdateProgressEvent) => {
        setProgress(e)
    }, [setProgress])
    useEffect(() => {
        window.RiseCraftFn.onUpgrading = cb
        return () => {
            delete window.RiseCraftFn.onUpgrading
        }
    }, [cb])
    return <div>{(progress.percent * 100).toFixed(2)}% {progress.step}</div>
}