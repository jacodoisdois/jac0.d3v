import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './route'

const root = ReactDOM.createRoot(
  document.getElementById('root') as unknown as HTMLElement
)
root.render(
  <React.StrictMode>
    <Router></Router>
  </React.StrictMode>

)
