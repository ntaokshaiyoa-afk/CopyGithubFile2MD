import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

import { registerSW } from 'virtual:pwa-register'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)

// PWA登録
registerSW({
  immediate: true,
  onRegistered(reg) {
    console.log('Service Worker registered', reg)
  },
  onRegisterError(err) {
    console.error('SW registration failed', err)
  },
})
