import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Launcher } from './views/Launcher'
import { Upgrading } from './views/Upgrading'
import { SplashScreen } from './views/SplashScreen'
import { Background } from './components/Background'
import { ConfigProvider } from 'antd'

export function App() {
  return <ConfigProvider
    theme={{
      components:{
        Button:{
          fontFamily: "zPixel",
        }
      },
      token: {
        fontFamily: "zPixel",
      }
    }}
  >
    <Background>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={
            <SplashScreen />
          }></Route>
          <Route path='/launching' element={
            <Launcher />
          }></Route>
          <Route path='/upgrading' element={
            <Upgrading />
          }></Route>
        </Routes>
      </BrowserRouter>

    </Background>
  </ConfigProvider>
}
