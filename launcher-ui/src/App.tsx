import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Launcher } from './views/Launcher'
import { Upgrading } from './views/Upgrading'
import { UpdateChecker } from './views/UpdateChecker'
import { Background } from './components/Background'

export function App() {
  return <Background>

    <BrowserRouter>
      <Routes>
        <Route index path='/' element={
          <UpdateChecker />
        }></Route>
        <Route index path='/launching' element={
          <Launcher />
        }></Route>
        <Route index path='/upgrading' element={
          <Upgrading />
        }></Route>
      </Routes>
    </BrowserRouter>

  </Background>
}
