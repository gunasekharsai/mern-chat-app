import React, { useState } from "react";
import Profilecomp from "./Profilecomp";
import { useNavigate } from "react-router-dom";
import { DrawerDefault } from "./side";

const SideDrawer = () => {
  

  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();

  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const Dropdown = () => {
    return (
      <div>
        <div className="hs-dropdown relative inline-flex">
          <button
            id="hs-dropdown-default"
            type="button"
            className=" w-35 h-10 hs-dropdown-toggle py-3 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg  bg-gray-600 text-white shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Avatar />
            <svg
              className="hs-dropdown-open:rotate-180 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
            aria-labelledby="hs-dropdown-default"
          >
            <div className="cursor-pointer">
              <Profilecomp />
            </div>
            <div
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer "
              onClick={logouthandler}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Avatar = () => {
    return (
      <div>
        <span className="inline-block size-6 bg-gray-100 rounded-full overflow-hidden">
          <svg
            class="size-full text-gray-300"
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
      </div>
    );
  };

  // drawer
  return (
    <div className="bg-gray-600 flex justify-between p-1 2 h-15">
      <div className="align-middle">
        <DrawerDefault/>
      </div>
      <Dropdown />
    </div>
  );
};

export default SideDrawer;
