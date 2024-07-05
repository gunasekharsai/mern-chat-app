import React, { useEffect, useState } from "react";
import { useChatState } from "../../Context/ChatProvider";
import { getsender } from "../../config/getSender";
import axios from "axios";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
let socket, selectedChatCompare;

const ChatBox = () => {
  const { selectedchat, user } = useChatState();
  const [newmessage, setnewmessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setisTyping] = useState(false)
  const fetchChats = async () => {
    if (!selectedchat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/message/${selectedchat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedchat._id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on('typing', () => setTyping(true));
    socket.on('stop typing', ()=> setTyping(false));

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    fetchChats();
    selectedChatCompare = selectedchat;
  }, [selectedchat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // Notification logic can be added here
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, []);

  const messagesender = async () => {
    if (!newmessage || !selectedchat) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setnewmessage("");
      const { data } = await axios.post(
        "http://localhost:3000/api/message",
        {
          content: newmessage,
          chatId: selectedchat._id,
        },
        config
      );

      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (e) {
      console.log("Error sending message:", e);
    }
  };

  const handlekeydown = (event) => {
    if (event.key === "Enter" && newmessage) {
      messagesender();
    }
  };

  const typinghandler = (e) => {
    setnewmessage(e.target.value);
    //typing indicator logic
    if(!socketConnected) return;
    if(!typing){
      setTyping(true);
      socket.emit('typing', selectedchat._id)
    }
    let lastTypingtime = new Date().getTime()
    var timerLength = 3000;
    setTimeout(() =>{
      var timenow = new Date().getTime();
      var timediff = timenow-lastTypingtime;
      if(timediff>=timerLength && typing){
        socket.emit('stoptyping', selectedchat._id);
        setTyping(false);
      }
    },timerLength)
  };

  return (
    <div className="m-4 8 rounded-xl h-auto w-full flex flex-col border border-gray-600 bg-gray-200">
      {selectedchat ? (
        <>
          <div className="pl-3 pt-2 pb-2 text-xl font-bold">
            {getsender(user, selectedchat.users)}
          </div>
          <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg mb-4" style={{ maxHeight: '70vh' }}>
            {messages.map((m) => (
              <div
                key={m._id}
                className={`flex mb-2 ${
                  m.sender._id === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    m.sender._id === user._id
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-300 text-gray-800 self-start"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center text-2xl inline-block align-middle">
          No chat selected
        </div>
      )}
      <div className="flex mt-auto">
        {typing?<div>laoding...</div> : <> </>}
        <input
          type="text"
          className="flex-grow p-2 rounded-l-lg border border-gray-300"
          placeholder="Type your message here..."
          onChange={typinghandler}
          onKeyDown={handlekeydown}
          value={newmessage}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg"
          onClick={messagesender}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
