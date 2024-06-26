import { useEffect, useState } from "react"

import logo from "../main.jpg"
import { useNavigate } from "react-router-dom"
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
export const Home = () =>{
  const [view, setview] = useState('login');
  const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("token"));
        if (userInfo) {
            navigate('/chats');
        }
    }, [navigate]);

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