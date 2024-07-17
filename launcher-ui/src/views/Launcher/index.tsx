
import css from "./index.module.scss"

import { Content } from './Content'
import { useState } from "react"
import { Updater } from "./Updater"

export function Launcher() {

  const [showContent,setShowContent] = useState(false)
  return (
    <div style={{overflow:"hidden"}}>
      {/* <div style={{zIndex}}></div> */}
      <div className={css.videoBackground}>
      <video className={css.backgroundVideo} style={{
        width:"100%",
        height:"100%",
      }} muted loop autoPlay src="https://mc.zsh2401.top/wp-content/uploads/2020/06/videoplayback.mp4"/>
      </div>
      <div className={css.contentWrapper}>
        {
          showContent ?  <Content/> : <Updater onNoUpdate={()=>setShowContent(true)}/>
        }
       
      </div>
    </div>
  )
}
