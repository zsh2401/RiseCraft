/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react"
import "./Status.scss"
import { isBlankOrNullOrEmpty } from "sz-react-support"
export function Status() {
    const ref = useRef("")
    const [show, setShow] = useState(false)
    const [signal, setSignal] = useState(0)
    const pre = useRef<HTMLPreElement | null>(null)

    const scrollToEnd = useCallback(() => {
        if (!pre.current) {
            return
        }
        pre.current.scrollTop = pre.current.scrollHeight
    }, [pre])

    const onLaunching = useCallback((e: any) => {
        setShow(true)
        ref.current += `\n启动中:${e}\n`
        setSignal(Date.now())
        scrollToEnd()
    }, [scrollToEnd])

    const onInstalling = useCallback((e: any) => {
        setShow(true)
        ref.current += `安装中:${e}\n`
        setSignal(Date.now())
        scrollToEnd()
    }, [scrollToEnd])

    useEffect(() => {
        window.RiseCraftFn.onLaunching = onLaunching
        window.RiseCraftFn.onInstalling = onInstalling
        return () => {
            delete window.RiseCraftFn.onLaunching
            delete window.RiseCraftFn.onLaunching
        }
    }, [onInstalling, onLaunching])

    return <pre ref={pre} style={{
        visibility: show ? "unset" : "hidden"
    }} className="status">
        {/* {signal} */}
        {ref.current}
    </pre>
}