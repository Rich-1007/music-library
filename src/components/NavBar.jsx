import React from "react";

const NavBar = () => {
  return (
    <div className="flex gap-4 justify-between  bg-[#141414]  border-0 w-full  px-8 py-2  ">
      <div className="text-amber-100 md:text-2xl text-md">
        <p>Music Library</p>
      </div>
      <div className="flex  gap-5 justify-end">
        <div className="pl-2 text-[0.73rem] text-gray-300 font-mono  flex flex-col gap-0">
          <span className="cursor-pointer hover:text-amber-200">User</span>
          <span className="cursor-pointer hover:text-amber-200">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
