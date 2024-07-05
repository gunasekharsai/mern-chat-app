import React, { useEffect, useState } from "react";
import { useChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { getsender } from "../../config/getSender";

const MyChats = () => {
  const { chats, setchats, selectedchat, setselectedchat, user } =
    useChatState();
  const [loggeduser, setloggeduser] = useState();

  const fetchchats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:3000/api/chat",
        config
      );
      console.log(data);
      setchats(data);
    } catch (err) {
      alert("Failed to load chats");
    }
  };

  useEffect(() => {
    setloggeduser(JSON.parse(localStorage.getItem("token")));
    fetchchats();
  }, []);

  return (
    <div className="flex flex-col w-1/4 h-auto m-4 mb-4 rounded-2xl border border-gray-600">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-xl font-semibold mb-4">My Chats</h1>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`p-3 mb-2 cursor-pointer border border-gray-400 rounded-lg ${
                selectedchat && selectedchat._id === chat._id
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() => setselectedchat(chat)}
            >
              <div className="text-sm">
                <strong>Chat with:</strong> {getsender(loggeduser, chat.users)}
              </div>
              <div className="text-sm">
                <strong>Last message:</strong>{" "}
                {chat.latestMessage
                  ? chat.latestMessage.content
                  : "No messages yet"}
              </div>
            </div>
          ))
        ) : (
          <p>No chats found</p>
        )}
      </div>
      <div className="h-4"></div> {/* Adding this div to provide a bottom margin */}
    </div>
  );
};

export default MyChats;
