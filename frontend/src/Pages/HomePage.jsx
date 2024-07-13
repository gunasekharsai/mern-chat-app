import { useState } from "react";
import logo from "../main.jpg";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";

export const Home = () => {
  const [view, setView] = useState('login');

  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex justify-center">
          <img className="h-20 w-20" src={logo} alt="" />
        </div>
        <div className="flex justify-center">
          <div className="h-10 w-96 bg-gray-200 rounded-lg flex flex-row justify-around items-center relative">
            <div
              className={`h-7 w-32 rounded-2xl flex items-center justify-center cursor-pointer ${
                view === 'login' ? 'border-b-4 border-gray-500' : ''
              }`}
              onClick={() => setView('login')}
            >
              Login
            </div>
            <div
              className={`h-7 w-32 rounded-2xl flex items-center justify-center cursor-pointer ${
                view === 'signup' ? 'border-b-4 border-gray-500' : ''
              }`}
              onClick={() => setView('signup')}
            >
              Signup
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          {view === 'login' ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}
