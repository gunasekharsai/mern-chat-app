import { useChatState } from "../Context/ChatProvider"
import ChatBox from "../components/chatpage_comp/chatbox";
import MyChats from "../components/chatpage_comp/mychats";
import SideDrawer from "../components/chatpage_comp/sidedrawer";


export const Chat = () => {
  const { user } = useChatState();
 
  return (
    <div>
        {user && <SideDrawer/>}
        <div className="flex justify-between p-10">
         { user && <MyChats/>}
        {  user && <ChatBox/>}

        </div>
    </div>
  );
};