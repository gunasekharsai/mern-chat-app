import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatProvider from './Context/ChatProvider.jsx'
import ErrorBoundary from './components/errorboundry.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
         <ChatProvider>
             <App />
         </ChatProvider>
      </BrowserRouter> 
    </ErrorBoundary>
  </React.StrictMode>

     
   
)
