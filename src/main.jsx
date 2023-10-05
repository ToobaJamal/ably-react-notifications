import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Realtime } from 'ably';
import { AblyProvider } from 'ably/react';
 
const client = new Realtime({authUrl: "http://127.0.0.1:3001/auth"})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AblyProvider client={client}>
    <App />
    </AblyProvider>
  </React.StrictMode>,
)
