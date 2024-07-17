import { useCallback, useEffect, useState } from "react";

export function JavaSelector(props: { onSelect: (java: string) => void }) {
    const [state, setState] = useState<string[]>([])
    const updateJavaPaths = useCallback(async () => {
        const javas = await window.RiseCraft.getJavaPaths()
        setState(javas)
        props.onSelect(javas[0])
    }, [props])

    useEffect(() => {
        updateJavaPaths()
    }, [updateJavaPaths])
    return <div>
        {/* <h1>?</h1> */}
        {state.map((java) => {
            return <p>{java}</p>
        })}
    </div>
}