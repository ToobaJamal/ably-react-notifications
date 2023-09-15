import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Realtime } from 'ably';
import { AblyProvider } from 'ably/react';
 
const client = new Realtime({ key: "iI-x3Q.Jz2O0g:z20RPrzFyGx4vRxCXj-uXkRYKxyWm7Z8yltrnJIsI6Y"});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AblyProvider client={client}>
    <App />
    </AblyProvider>
  </React.StrictMode>,
)

