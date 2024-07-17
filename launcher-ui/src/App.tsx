import { Button } from 'antd'
import './App.css'
import { JavaSelector } from './components/JavaSelector'
import { useCallback, useEffect, useState } from 'react'

function App() {
  const [appData, setAppData] = useState<string>()
  const [java, setJava] = useState<string>()
  useEffect(() => {
    (async () => {
      setAppData(await window.RiseCraft.appDataDir())
    })()

  }, [])
  const launch = useCallback(() => {
    if (!java) {
      return
    }
    window.RiseCraft.launch({
      java,
      versionName: "夏日清凉幸运方块1.20.1",
      userName: "zsh2401",
      baseVersionName: "1.20.1",
      gamePath:  appData + "/game/.minecraft"
    })
  }, [java])

  const doUpdate = useCallback(() => {
    window.RiseCraft.performUpgrade()
  }, [])

  return (
    <>
      {appData}
      <JavaSelector onSelect={setJava} />
      <Button onClick={launch}>启动</Button>
      <Button onClick={doUpdate}>立即更新</Button>
    </>
  )
}

export default App
