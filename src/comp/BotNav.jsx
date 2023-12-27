import { NavLink } from "react-router-dom";
import React from "react";
import { logOut } from "../firebaseConfig";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineEmojiTransportation, MdAccountCircle  } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

export function BotNav() {
  return (
    <>
      <NavLink
        className={({ isActive, isPending }) => isPending
          ? "pending basis-[32%] m-auto text-center text-green-500 transition flex flex-col justify-center items-center"
          : isActive
            ? "active basis-[32%] m-auto text-center text-green-500 transition flex flex-col justify-center items-center"
            : "basis-[32%] m-auto text-center transition opacity-10 flex flex-col justify-center items-center"}
        to="/home"
      >
        <RxDashboard className="text-[6vw] max-w-[70px]" />
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) => isPending
          ? "pending basis-[32%] m-auto text-center text-green-500 transition flex flex-col justify-center items-center"
          : isActive
            ? "active basis-[32%] m-auto text-center text-green-500 transition flex flex-col justify-center items-center"
            : "basis-[32%] m-auto text-center transition opacity-10 flex flex-col justify-center items-center"}
        to="/activity"
      >
        <MdOutlineEmojiTransportation className="text-[6vw] max-w-[70px]" />
        <span className="text-xs capitalize">activity</span>
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) => isPending
          ? "pending basis-[32%] m-auto text-center text-green-500 transition flex flex-col justify-center items-center"
          : isActive
            ? "active basis-[32%] m-auto text-center text-green-500 transition flex flex-col justify-center items-center"
            : "basis-[32%] m-auto text-center transition opacity-10 flex flex-col justify-center items-center"}
        to="/account"
      >
        <MdAccountCircle  className="text-[6vw] max-w-[70px]" />
        <span className="text-xs capitalize">account</span>
      </NavLink>
      <button
        className={`basis-[32%] opacity-10 flex flex-col justify-center items-center`}
        onClick={logOut}
      >
        <TbLogout className="text-[6vw] max-w-[70px] " />
        <span className="text-xs capitalize">logout</span>
      </button>
    </>
  );
}
