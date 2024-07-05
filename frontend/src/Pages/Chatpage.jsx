import { useChatState } from "../Context/ChatProvider"
import ChatBox from "../components/chatpage_comp/chatbox";
import MyChats from "../components/chatpage_comp/mychats";
import SideDrawer from "../components/chatpage_comp/sidedrawer";


export const Chat = () => {
  const { user } = useChatState();
 
  return (
    <div className="flex flex-col h-screen">
    {user && <SideDrawer />}
    <div className="flex flex-grow overflow-auto">
     { user &&  <MyChats />}
     { user && <ChatBox />}
    </div>
  </div>
  );
};