import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/HomePage'
import { Chat } from './Pages/Chatpage'

function App() {
  return (
   
       <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/chats' element= {<Chat/>} />
       </Routes>
       )
}

export default App
