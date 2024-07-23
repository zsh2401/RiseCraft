import { Slider, SliderSingleProps } from "antd"
import { useCallback, useEffect, useState } from "react"

const marks: SliderSingleProps['marks'] = {
    10: "1GB",
    20: "2GB",
    40: "4GB",
    60: "8GB",
    80: "16GB",
    100: "32GB"
}
function markValueToG(value: number) {
    try {
        const v = marks![value]! + ""
        const str = v.split("GB")[0]
        const G = Number.parseInt(str)
        // alert(G)
        return G
    } catch {
        return 8;
    }
}
function fromGtoMarkValue(G: number): number {
    for (const key in marks!) {
        if (markValueToG(Number.parseInt(key)) === G) {
            return Number.parseInt(key)
        }
    }
    return 60
}

export function MemorySelector(props: {
    onSelect: (G: number) => void
}) {
    const [xmxG, setXmxG] = useState<number>()
    useEffect(() => {
        (async () => {
            const G = await window.RiseCraft.read<number>("xmxg") ?? 8
            setXmxG(G)
            setMarkValue(fromGtoMarkValue(G))
        })()
    }, [])

    useEffect(() => {
        window.RiseCraft.save("xmxg", xmxG)
        setMarkValue(fromGtoMarkValue(xmxG))
    }, [xmxG])


    const [markValue, setMarkValue] = useState<number>(60)

    const onChanged = useCallback((value: number) => {
        setXmxG(markValueToG(value))
    }, [setXmxG])

    return <div style={{ display: "flex" }}>
        <span style={{margin:"auto 0"}}>
            游戏内存
        </span>
        {xmxG && <Slider style={{ flexGrow: 1 }} value={markValue} marks={marks}  onChange={onChanged} step={null} />}
    </div>

}