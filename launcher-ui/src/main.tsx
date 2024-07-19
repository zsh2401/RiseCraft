import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { prepareForBridge } from './Bridge.ts'
import { App } from './App.tsx';

(async ()=>{
  await prepareForBridge()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})()



