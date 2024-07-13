import React, { useEffect, useRef, useState } from "react";
import { useChatState } from "../../Context/ChatProvider";
import { getsender } from "../../config/getSender";
import axios from "axios";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
let socket, selectedChatCompare;

const ChatBox = () => {
  const {
    selectedchat,
    user,
    setselectedchat,
    Notification,
    setNotification,
    messages,
    setMessages,
  } = useChatState();
  const [newmessage, setnewmessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setisTyping] = useState(false);

  const messageendref = useRef(null);
  const scrollToBottom = () => {
    messageendref.current?.scrollIntoView({ behavior: "auto" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    socket.on("typing", () => setisTyping(true));
    socket.on("stop typing", () => setisTyping(false));
    socket.on("message deleted", (messageId) => {
      fetchChats();
    });
  
    return () => {
      socket.off("message deleted");
      socket.off("message received");
    };
  }, []);

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
        if (!Notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...Notification]);
          
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [messages]);
  const deletemessage = async (messageId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(
        `http://localhost:3000/api/message/${messageId}`,
        config
      );
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
      
    } catch (error) {
      console.error("error deleting messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newmessage || !selectedchat) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const messageToSend = newmessage;
      setnewmessage("");
      const { data } = await axios.post(
        "http://localhost:3000/api/message",
        {
          content: messageToSend,
          chatId: selectedchat._id,
        },
        config
      );

      socket.emit("new message", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    } catch (e) {
      console.log("Error sending message:", e);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && newmessage) {
      socket.emit("stop typing", selectedchat._id);
      sendMessage();
    }
  };

  const typingHandler = (e) => {
    setnewmessage(e.target.value);
    // Typing indicator logic
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedchat._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 2000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedchat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="m-4 rounded-xl h-auto w-full flex flex-col justify-between border border-gray-600 bg-gray-200">
      {selectedchat ? (
        <div className="flex flex-col h-full">
          <div className="flex flex-row">
            <div className="pl-3 pb-2 flex flex-row">
              <div
                className="pr-3 pt-3 hover:cursor-pointer"
                onClick={() => {
                  setselectedchat(null);
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </div>
              <div className="text-xl font-bold pt-2">
                {getsender(user, selectedchat.users)}
              </div>
              <div className="pl-4 text-md pt-3">
                {isTyping ? <div>typing...</div> : <></>}
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto bg-white rounded-xl m-3">
            {messages.map((m) => (
              <div
                key={m._id}
                className={`flex m-3 ${
                  m.sender._id === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    m.sender._id === user._id
                      ? "bg-gray-600 text-white self-end"
                      : "bg-gray-300 text-gray-800 self-start"
                  }`}
                >
                  {m.content}
                </div>
                <div className="ml-2">
                {m.sender._id === user._id && (
                  <>

                  <button
                    onClick={() =>{ 
                      alert("Are you sure you want to delete message");
                      deletemessage(m._id);
                    }}
                    className="ml-2 bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    <span class="material-symbols-outlined text-sm color-black">delete</span>
                  </button>
                  </>
                  
                )}
                </div>
               
              </div>
            ))}
            <div ref={messageendref} />
          </div>
          <div className="flex mt-auto">
            <input
              type="text"
              className="flex-grow p-2 rounded-l-lg border border-gray-300"
              placeholder="Type your message here..."
              onChange={typingHandler}
              onKeyDown={handleKeyDown}
              value={newmessage}
            />
            <button
              className="p-2 bg-gray-800 text-white rounded-r-lg"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-2xl inline-block align-middle">
          No chat selected
        </div>
      )}
    </div>
  );
};

export default ChatBox;
