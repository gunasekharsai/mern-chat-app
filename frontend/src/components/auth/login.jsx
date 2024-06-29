import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../toasts/Toast'

const Login = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const showHandler = () => {
        setShow(!show);
    };

    const loginHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            setLoading(false);
            showToastMessage("Please fill  * credentials", "error");
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post('http://localhost:3000/api/user/login', { email, password }, config);
            console.log(data);
            
            // Decode the token and store it in localStorage
            localStorage.setItem('token', JSON.stringify(data));

            setLoading(false);
            navigate('/chats');
        } catch (err) {
            showToastMessage("user not registered", 'error');
            console.log(err);
            setLoading(false);
        }
    };

    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };
    const spinner = () => {
        return (
            <div role="status">
                <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    };

    return (
        <div>
            {showToast && <Toast message={toastMessage} type={toastType} />}
            <div required>
                <label htmlFor="Email_Address" className="block mb-2 text-sm font-medium text-gray-900">Email_Address*</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5" placeholder="guna@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mt-4" required>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password*</label>
                <div className="relative">
                    <input type={show ? 'text' : 'password'} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 hover:pointer" onClick={showHandler}>{show ? "Hide" : "Show"}</button>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button type="button" className="text-white bg-gray-600 hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={loginHandler}>{loading ? spinner() : "Login"}</button>
            </div>
        </div>
    );
};

export default Login;
