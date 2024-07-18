import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Launcher } from './views/Launcher'
import { Upgrading } from './views/Upgrading'

export function App() {
  return <BrowserRouter>
  <Routes>
    <Route index path='/' element={
       <Launcher/>
    }></Route>
     <Route index path='/upgrading' element={
       <Upgrading/>
    }></Route>
  </Routes>
  </BrowserRouter>
  
 
}
