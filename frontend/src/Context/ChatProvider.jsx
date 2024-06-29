import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedchat,setselectedchat] = useState();
    const [chats, setchats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("token"));
            setUser(userInfo);
            if (!userInfo) {
                navigate('/');
            }
        } catch (error) {
            console.error("Failed to fetch user info from localStorage:", error);
            navigate('/');
        }
    }, [navigate]);

    return (
        <ChatContext.Provider value={{ user, setUser,selectedchat,setselectedchat, chats,setchats }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
