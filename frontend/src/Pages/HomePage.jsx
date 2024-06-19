import { useEffect, useState } from "react";
import axios from "axios";
export const Home = () => {
  const [chats, setchats] = useState([]);
 
  useEffect(() => {
    fetchchats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}> {/* Assuming each chat object has a unique 'id' */}
          {chat.Name} {/* Use lowercase 'name' assuming this is the correct property */}
        </div>
      ))}
    </div>
  );
};

const fetchchats = async () => {
  const { data } = await axios.get("http://localhost:5000/api/chats");
  console.log(data.chats)
  setchats(data.chats);
};
