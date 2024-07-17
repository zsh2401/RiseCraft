import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Bridge } from './Bridge.ts'

export const bridge = new Bridge()
await bridge.registerOnWindow("RiseCraft")
// alert("?")
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


