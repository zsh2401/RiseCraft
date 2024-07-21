import { useEffect } from "react"
import "./index.scss"
import { tryRemoveJourneyMap } from "../../addtional-tasks/removeJourneyMap"
import { useNavigate } from "react-router"
export function UpdateChecker() {
    const navigate = useNavigate()
    // const [stage,setStage] = useState<"checking" | "need-upgrade">("checking")
    useEffect(() => {
        (async () => {
            try{
                const should = await window.RiseCraft.isUpgradable()
                // 1.0.2->1.0.3
                await tryRemoveJourneyMap()
                if(should){
                    await window.RiseCraft.performUpgrade()
                }else{
                    navigate("/launching")
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }catch(err:any){
                if(err instanceof Error){
                    alert("无法检查更新:" + err.message)
                }else{
                    alert( "无法检查更新:" + JSON.stringify(err))
                }
                navigate("/launching")
            }
        })()
    }, [])
    return <div className="updater">
        正在检查更新
    </div>
}