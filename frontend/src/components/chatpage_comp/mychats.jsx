import React, { useEffect, useState } from "react";
import { useChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { getsender } from "../../config/getSender";

const MyChats = () => {
  const {
    chats,
    setchats,
    selectedchat,
    setselectedchat,
    Notification,
    messages,
  } = useChatState();
  const [loggeduser, setloggeduser] = useState();

  const fetchchats = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:3000/api/chat",
        config
      );
      setchats(data);
    } catch (err) {
      alert("Failed to load chats");
    }
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("token"));
    if (loggedUser) {
      setloggeduser(loggedUser);
      fetchchats(loggedUser.token);
    }
  }, [messages]);
  return (
    <div className="flex flex-col w-full h-auto m-4 mb-4 rounded-2xl border border-gray-600 md:full">
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
                {chat.latestmessage
                  ? chat.latestmessage.content
                  : "No messages yet"}
              </div>
              <div className="">
                {countUnreadMessages(Notification, chat._id) > 0 && (
                  <div className="">
                    {countUnreadMessages(Notification, chat._id)}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No chats found</p>
        )}
      </div>
    </div>
  );
};

const countUnreadMessages = (notifications, chatId) => {
  return notifications.filter(
    (notification) => notification.chat._id === chatId
  ).length;
};
export default MyChats;