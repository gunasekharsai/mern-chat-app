import { useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useChatState } from "../../Context/ChatProvider";
import axios from "axios";

export function DrawerDefault() {
  const { user, setselectedchat, chats, setchats } = useChatState();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something in search");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Failed to load the search results");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        'http://localhost:3000/api/chat',
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setchats([data, ...chats]);
      setselectedchat(data);
      setLoading(false);
      closeDrawer();
    } catch (err) {
      setLoading(false);
      alert("Failed to fetch the chats");
    }
  };

  return (
    <>
      <div
        className="w-35 h-10 font-medium rounded-lg text-sm px-6 py-2.5 bg-gray-600 text-white shadow-sm hover:bg-gray-800"
        onClick={openDrawer}
      >
        Search
      </div>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="w-60 flex flex-row">
          <Input label="Search" onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleSearch}>
            <span className="material-symbols-outlined pl-5">search</span>
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-4">
            {searchResult.length > 0 ? (
              searchResult.map((user) => (
                <div
                  key={user._id}
                  className="cursor-pointer p-2 border-b border-gray-200 flex flex-col"
                  onClick={() => accessChat(user._id)}
                >
                  <div className="text-sm">Name: {user.name}</div>
                  <div className="text-sm">Email: {user.email}</div>
                </div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
        )}
      </Drawer>
    </>
  );
}
