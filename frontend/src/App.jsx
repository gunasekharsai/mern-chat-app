import { useState } from 'react'
import {BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/HomePage'
import { Chat } from './Pages/Chatpage'

function App() {
  return (
    <BrowserRouter>
   <Routes>
      <Route path='/' element= {<Home/>} />
      <Route path='/chats' element= {<Chat/>} />
   </Routes>
  </BrowserRouter>
  )
}

export default App
