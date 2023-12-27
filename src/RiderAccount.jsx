import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Logo } from "./comp/Logo";

import { FaStar } from "react-icons/fa";
import { PiCircleDashedBold } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { TbPeace } from "react-icons/tb";
import { FaGift } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { ImCog } from "react-icons/im";
import { RiUserStarFill } from "react-icons/ri";
import { RiSuitcaseFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
import { BiSolidUpArrow } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

export function RiderAccount() {
  const nav = useNavigate();
  const [user] = useAuthState(auth);
  const [usr, setusr] = useState("");
  useEffect(() => {
    if (!user) nav("/");
    setusr(user?.displayName);
  }, [user]);
  return (
    <>
      <Logo />
      <div className="flex flex-col overflow-y-scroll w-[100%]">
        <div className="flex justify-between p-2">
          <div>
            <p className="capitalize text-lg font-[600]">{usr}</p>
            <span className="flex gap-2 items-center">
              <FaStar /> 4.93
            </span>
          </div>
          <div>
            <img
              src={user?.photoURL}
              alt=""
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-center gap-[5vw] px-2">
          <div className="flex flex-col justify-center items-center bg-gray-200 py-4 px-8 max-[350px]:py-2 max-[350px]:px-4 rounded-xl max-[800px]:flex-1 active:scale-[.96] transition origin-center">
            <PiCircleDashedBold />
            <p>Help</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-200 py-4 px-8 max-[350px]:py-2 max-[350px]:px-4 rounded-xl max-[800px]:flex-1 active:scale-[.96] transition origin-center">
            <RiSecurePaymentLine />
            <p>Payment</p>
          </div>
          <div
            onClick={() => nav("/activity")}
            className="flex flex-col justify-center items-center bg-gray-200 py-4 px-8 max-[350px]:py-2 max-[350px]:px-4 rounded-xl max-[800px]:flex-1 active:scale-[.96] transition origin-center"
          >
            <MdOutlineEmojiTransportation />
            <p>Activity</p>
          </div>
        </div>

        <div className="flex justify-between p-8 bg-gray-200 rounded-xl my-4 mx-2 active:scale-[.96] transition origin-left">
          <div>
            <p className="text-xl font-[600]">FlexRide One</p>
            <p className="text-gray-500 text-sm">Try free for 1 month</p>
          </div>
          <div>
            <TbPeace className="text-[10vw] text-[#b95315]" />
          </div>
        </div>

        <div className="flex justify-between p-8 bg-gray-200 rounded-xl my-4 mx-2 active:scale-[.96] transition origin-left">
          <div>
            <p className="text-xl font-[600]">Safety check-up</p>
            <p className="text-gray-500 text-sm">
              Boost your safety profile by turning on additional features
            </p>
          </div>
          <div>
            <span className="p-3 border-2 rounded-full border-black/60 border-dashed">
              1/5
            </span>
          </div>
        </div>

        <div className="flex flex-col p-2">
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <FaGift />
            <p className="font-[600]">Send a gift</p>
          </div>
          <div className="flex gap-4 px-4 py-2 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <FaUsers />
            <div className="flex flex-col">
              <p className="font-[600]">Family</p>
              <p className="text-xs text-gray-400">Manage a family profile</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <ImCog />
            <p className="font-[600]">Settings</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <FaEnvelope />
            <p className="font-[600]">Messages</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <RiUserStarFill />
            <p className="font-[600]">Earn by driving or delivering</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <RiSuitcaseFill />
            <p className="font-[600]">Business hub</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <FaBus />
            <p className="font-[600]">Public transport</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <BiSolidUpArrow className="rotate-[45deg]" />
            <p className="font-[600]">FlexRide Eats promotions</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <MdFavorite />
            <p className="font-[600]">FlexRide Eats favorites</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <HiUsers />
            <p className="font-[600]">Refer friends, unlock deals</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <FaUser />
            <p className="font-[600]">Manage FlexRide Account</p>
          </div>
          <div className="flex gap-4 p-4 items-center active:scale-[.96] transition origin-left active:bg-gray-200 rounded-xl">
            <FaInfoCircle />
            <p className="font-[600]">Legal</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm px-4">v4.503.10003</p>
      </div>
    </>
  );
}
