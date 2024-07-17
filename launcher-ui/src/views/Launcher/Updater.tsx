import { useEffect, useState } from "react"
import "./updater.scss"
export function Updater(props: {
    onNoUpdate: () => void
}) {
    // const [stage,setStage] = useState<"checking" | "need-upgrade">("checking")
    useEffect(() => {
        (async () => {
            try{
                const should = await window.RiseCraft.isUpgradable()
                if(should){
                    await window.RiseCraft.performUpgrade()
                }else{
                    props.onNoUpdate()
                }
            }catch{
                props.onNoUpdate()
            }
          
        })()
    }, [props])
    return <div className="updater">
        正在检查更新
    </div>
}