import React, { useState } from "react";
import Profilecomp from "./Profilecomp";
import { useNavigate } from "react-router-dom";
import { DrawerDefault } from "./side";

const SideDrawer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logouthandler = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('storage'));
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const Avatar = () => {
    return (
      <span className="inline-block w-6 h-6 bg-gray-100 rounded-full overflow-hidden">
        <svg
          className="w-full h-full text-gray-300"
          width="10"
          height="10"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.62854"
            y="0.359985"
            width="15"
            height="15"
            rx="7.5"
            fill="white"
          ></rect>
          <path
            d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
            fill="currentColor"
          ></path>
          <path
            d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    );
  };

  return (
    <div className="bg-gray-600 flex justify-between items-center p-2 h-15">
      <div className="align-middle">
        <DrawerDefault />
      </div>
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="w-35 h-10 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-gray-600 text-white shadow-sm hover:bg-gray-800"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <Avatar />
          <svg
            className={`transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {dropdownOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <div className="cursor-pointer" role="menuitem">
                <Profilecomp />
              </div>
              <div
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={logouthandler}
                role="menuitem"
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideDrawer;
