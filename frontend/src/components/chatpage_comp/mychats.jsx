import React, { useEffect, useState } from "react";
import { useChatState } from "../../Context/ChatProvider";

const MyChats = () => {
  const {chats,setchats,selectedchat,setselectedchat,user} = useChatState();
  const [loggeduser,setloggeduser] = useState();
  const fetchchats = async() =>{
    try{
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get('http://localhost:3000/api/chat',config);
      
      console.log(data);
      setchats(data);
    }catch(err){
      alert("failed to load chats");
    }
  };
  useEffect(() =>{
    setloggeduser(JSON.parse(localStorage.getItem('token')));
    fetchchats();
  },[]);

  return <div>hi fropm mychats</div>;
};

export default MyChats;
