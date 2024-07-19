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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }catch(err:any){
                if(err instanceof Error){
                    alert("无法检查更新:" + err.message)
                }else{
                    alert( "无法检查更新:" + JSON.stringify(err))
                }
                props.onNoUpdate()
            }
          
        })()
    }, [props])
    return <div className="updater">
        正在检查更新
    </div>
}