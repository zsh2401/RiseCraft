import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Bridge } from './Bridge.ts'
import { App } from './App.tsx';
export const bridge = new Bridge();
(async ()=>{
  window.RiseCraftFn = {}
  await bridge.registerOnWindow("RiseCraft")
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})()



