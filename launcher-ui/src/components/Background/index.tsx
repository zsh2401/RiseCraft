import { IStdProps } from "sz-react-support";
import css from "./index.module.scss"
export function Background(props:IStdProps){
    return <div style={{ overflow: "hidden" }}>
      <div className={css.videoBackground}>
        <video className={css.backgroundVideo} style={{
          width: "100%",
          height: "100%",
        }} muted loop autoPlay src="https://mc.zsh2401.top/wp-content/uploads/2020/06/videoplayback.mp4" />
      </div>
      <div className={css.contentWrapper}>
        {props.children}
      </div>
    </div>
}