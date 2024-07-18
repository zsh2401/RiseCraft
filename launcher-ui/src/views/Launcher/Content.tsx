
import { useCallback, useEffect, useState } from 'react'
import "./content.scss"
import { Button, Input } from 'antd'
export function Content() {
    const [appData, setAppData] = useState<string>()
    const [java, setJava] = useState<string>()
    const [userName, setUserName] = useState<string>()
    useEffect(() => {
        (async () => {
            setAppData(await window.RiseCraft.appDataDir())
            await window.RiseCraft.save("a",{code:1})
            // alert(await window.RiseCraft.read("a"))
            // alert(JSON.stringify(await window.RiseCraft.version()))
        })()
    }, [])
    const launch = useCallback(async () => {
        // alert(java)
        await window.RiseCraft.save("a",{code:1})
        alert(await window.RiseCraft.read("a"))
        if (!java || !userName) {
            return
        }
        try{
            await window.RiseCraft.launch({
                java,
                versionName: "1.18.2-forge-40.2.21",
                userName,
                baseVersionName: "1.18.2",
                gamePath: appData + "/game/.minecraft"
            })
        }catch(err){
            alert(err)
        }
        
        await window.RiseCraft.exitLauncher(0)
    }, [java,userName])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const doUpdate = useCallback(() => {
        window.RiseCraft.performUpgrade()
    }, [])

    useEffect(()=>{
        (async ()=>{
            setJava((await window.RiseCraft.getJavaPaths())[0])
        })()
     
    },[])
    return <div className='content'>
        <h1>RiseCraft</h1>
        <h3>Have fun!</h3>
        <div className='pad'>
            <Input value={userName} onChange={e => setUserName(e.target.value)} placeholder='用户名' />
            <br/><br/>
            <Button size='large' type='primary' onClick={launch}>启动</Button>
        </div>

    </div>
}