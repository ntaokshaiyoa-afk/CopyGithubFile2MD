import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

import { registerSW } from 'virtual:pwa-register'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)

registerSW({
  immediate: true,
  onRegistered(reg: ServiceWorkerRegistration | undefined) {
    console.log('SW registered', reg)
  },
  onRegisterError(err: unknown) {
    console.error('SW registration failed', err)
  },
})
