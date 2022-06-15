import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './assets/css/main.css'
import './assets/css/tailwind.css'
import {BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/todolist-react'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
