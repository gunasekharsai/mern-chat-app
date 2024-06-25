import { useState } from "react"
import Login from "../components/auth/login"
import Signup from "../components/auth/signup"
import logo from "../main.jpg"
export const Home = () =>{

  const [view, setview] = useState('login');
  return <div >
    <div className="flex flex-col ">
      <div className="flex justify-center">
          <img className=" h-20 w-20" src= {logo} alt="" />  
      </div>
      <div className="flex justify-center">
        <div className="h-10 w-96 bg-gray-200 rounded-lg flex flex-row justify-around items-center">
          <div className="h-7 w-32 hover:bg-gray-400 rounded-2xl flex items-center justify-center cursor-pointer" onClick={()=>setview('login')}>Login</div>
          <div className="h-7 w-32 hover:bg-gray-400 rounded-2xl flex items-center justify-center cursor-pointer" onClick={()=>setview('signup')}>Signup</div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
         {view == 'login' ? <Login/> : <Signup/>}
      </div>
    </div>
    
    
  </div>
} 