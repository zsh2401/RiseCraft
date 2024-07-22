import { AshlynnArea } from "./AshlynnArea";
import { Status } from "./Stauts";
import yy from "./yy.ico"
import {TypeAnimation} from "react-type-animation"
export function Launcher() {
    return <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }}>
        <h1 style={{ textAlign: "center", fontSize: "80px", marginBottom: "48px", letterSpacing: "10px" }}>
        <TypeAnimation
        repeat={Infinity}
        sequence={[
            "基友群MC十周年纪念!",
            2000,
            "Rise Craft 2024",
            2000,
            "GFCS 2024",
            2000,
            "Minecraft 1.20.1",
            2000,
        ]}
        >

        </TypeAnimation>

        </h1>
        <div style={{
            display: "flex", justifyContent: "center"
        }}>
            <div>
                <iframe
                    style={{
                        width: "40vw", height: "50vh",

                        border: "none",
                        borderRadius: "10px"
                    }}
                    src="https://api.mc.zsh2401.top/map/"></iframe>

            </div>
            <div style={{ marginLeft: "32px", width: "300px" }}>
                {/* <h1 style={{textAlign:"center",margin:"10px"}}>Rise Craft</h1> */}
                <AshlynnArea />
                <div style={{
                    color: "black",
                    background: "whitesmoke",
                    padding: "16px",
                    width: "100%",
                    marginTop: "12px",
                    borderRadius: "16px"
                }}>
                    <h4>有关链接</h4>
                    <a style={{ color: "blue" }} href="https://littleskin.cn/" target="_blank">Little Skin皮肤站</a>
                    <br />
                    <a style={{ color: "blue" }} href="链接:https://pan.baidu.com/s/1u23WEhJF99Ft7SEfdQ5UNg?pwd=g7ji" target="_blank">下载RiseCraft客户端</a>
                    <br />
                    <p><img src={yy}></img> YY 90212547开黑！</p>

                </div>

            </div>
        </div>
        <div style={{
            width: "60vw",
            margin: "16px auto 0 auto",
            borderRadius: "16px",
            // background:"red",
            padding:"16px",
            background: "rgba(0,0,0, 0.5)",
            color: "whitesmoke"
        }}>
            <Status />
        </div>


    </div>
}