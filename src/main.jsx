import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className='w-full h-screen bg-blue-50'>
      <App />
    </main>
  </React.StrictMode>,
)
