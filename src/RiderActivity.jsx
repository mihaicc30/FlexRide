import { MdMenu } from "react-icons/md";
import { IoIosRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Logo } from "./comp/Logo";
import { AppContext } from "./App";

import Car1 from "./assets/car1";
import Car2 from "./assets/car2";
import Car3 from "./assets/car3";
import Car4 from "./assets/car4";

function LoadingComponent() {
  return (
    <div className={`flex gap-1 p-2 flex-nowrap`}>
      <span
        className={`w-14 h-14 rounded-md linear-background bg-gray-200`}
        style={{
          animationDelay: "1s",
        }}
      ></span>
      <div className={`flex flex-col gap-1 flex-nowrap`}>
        <span
          className={`bg-gray-200 h-4 w-[30vw] rounded-full linear-background`}
          style={{
            animationDelay: "1.2s",
          }}
        ></span>
        <span
          className={`bg-gray-200 h-4 w-[24vw] rounded-full linear-background`}
          style={{
            animationDelay: "1.4s",
          }}
        ></span>
        <span
          className={`bg-gray-200 h-4 w-[10vw] rounded-full linear-background`}
          style={{
            animationDelay: "1.6s",
          }}
        ></span>
      </div>
      <span
        className={`ml-auto mr-2 w-14 h-4 rounded-md linear-background bg-gray-200`}
        style={{
          animationDelay: "1s",
        }}
      ></span>
    </div>
  );
}

function RebookComponent({ from1, from2, delay, car, onclick }) {
  return (
    <div
      className="grid grid-cols-[100px_1fr_100px] max-[500px]:grid-cols-[70px_1fr_100px] gap-4 max-[500px]:gap-1 w-[100%] opacity-0 animate-fadeUP"
      style={{ animationDelay: `${delay}s` }}
      onClick={onclick}
    >
      <div className="flex justify-center items-center bg-gray-200 rounded-xl">
        {car}
      </div>
      <div className="flex flex-col justify-center flex-1 px-4 max-[500px]:px-1 overflow-hidden">
        <p className="whitespace-nowrap text-ellipsis overflow-hidden ">
          {from1}
        </p>
        <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] text-xs text-gray-500">
          {from2}
        </p>
      </div>
      <div className="flex justify-center">
        <button className="px-4 py-2 rounded-xl bg-gray-200 my-auto flex items-center gap-1 mr-2">
          <IoIosRefresh /> Rebook
        </button>
      </div>
    </div>
  );
}

export function RiderActivity() {

  
  const {
    fromLocationDescription,
    fromLocationCoords,
    toLocationDescription,
    toLocationCoords,
    updateContext,
  } = useContext(AppContext);
  const activities = [
    {
      from1: "Fuego Neapolitan Pizza & Grill, Foregate Street, Worcester, UK",
      from2: "35 Foregate St, Worcester",
      car: <Car1 />,
      onclick: () => {
        updateContext({
          fromLocationDescription: "7 Dove Close, Worcester, UK",
          toLocationDescription:
            "Fuego Neapolitan Pizza & Grill, Foregate Street, Worcester, UK",
          toLocationCoords: {
            lat: 52.196521,
            lng: -2.222938,
          },
          fromLocationCoords: {
            lat: 52.19573500000001,
            lng: -2.1968892,
          },
        });
        nav("/services");
      },
    },
    {
      from1: "7 Dove Close, Worcester, UK",
      from2: "WR4 9EA",
      car: <Car4 />,
      onclick: () => {
        updateContext({
          fromLocationDescription:
            "Fuego Neapolitan Pizza & Grill, Foregate Street, Worcester, UK",
          toLocationDescription: "7 Dove Close, Worcester, UK",
          fromLocationCoords: {
            lat: 52.196521,
            lng: -2.222938,
          },
          toLocationCoords: {
            lat: 52.19573500000001,
            lng: -2.1968892,
          },
        });
        nav("/services");
      },
    },
  ];

  const nav = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) nav("/");
  }, [user]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);

  return (
    <>
      <Logo />
      {loading && (
        <div className="flex flex-col overflow-y-auto w-[100%] animate-fadeLater">
          {Array.from({ length: 10 }).map((_, index) => {
            new Promise((resolve) => setTimeout(resolve, index * 1000));
            return <LoadingComponent key={index} />;
          })}
        </div>
      )}
      {!loading && (
        <div className="flex flex-col overflow-y-auto w-[100%] gap-4 p-2">
          {activities.map(({ from1, from2, car, onclick }, index) => (
            <RebookComponent
              key={index}
              from1={from1}
              from2={from2}
              car={car}
              delay={index * 0.05}
              onclick={onclick}
            ></RebookComponent>
          ))}
        </div>
      )}
    </>
  );
}
