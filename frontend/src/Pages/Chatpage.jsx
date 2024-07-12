import { useState } from "react";
import { useChatState } from "../Context/ChatProvider"
import ChatBox from "../components/chatpage_comp/chatbox";
import MyChats from "../components/chatpage_comp/mychats";
import SideDrawer from "../components/chatpage_comp/sidedrawer";


export const Chat = () => {
  const { user,selectedchat,setselectedchat} = useChatState();

  return (
    <div className="flex flex-col h-screen">
      {user && <SideDrawer />}
      <div className="flex flex-grow overflow-auto">
        {user && (
          <div
            className={`${
              selectedchat ? 'hidden md:flex' : 'flex flex-grow'
            }`}
          >
            <MyChats/>
          </div>
        )}
        {user && selectedchat && (
          <div className="flex flex-grow md:flex">
            <ChatBox/>
          </div>
        )}
      </div>
    </div>
  );
};