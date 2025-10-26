import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-card, #1e1e1e)',
            color: 'var(--text-primary, #ffffff)',
            border: '1px solid var(--bg-tertiary, #2a2a2a)',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
