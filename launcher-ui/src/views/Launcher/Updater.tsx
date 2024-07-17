import { useEffect, useState } from "react"
import "./updater.scss"
export function Updater(props: {
    onNoUpdate: () => void
}) {
    // const [stage,setStage] = useState<"checking" | "need-upgrade">("checking")
    useEffect(() => {
        (async () => {
            const should = await window.RiseCraft.isUpgradable()
            await window.RiseCraft.performUpgrade()
        })()
    }, [props])
    return <div className="updater">
        正在检查更新
    </div>
}