import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Auth } from "../Auth";
import { RiderHome } from "../RiderHome";
import { RiderMap } from "../RiderMap";
import { RiderAccount } from "../RiderAccount";
import { RiderServices } from "../RiderServices";
import { BotNav } from "./BotNav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { RiderActivity } from "../RiderActivity";

const Paths = () => {
  const [user] = useAuthState(auth);
  const loc = useLocation();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            className={`h-[100svh] flex flex-col w-[100svw] overflow-hidden max-w-[1046px] min-[1046px]:mx-auto`}
          >
            <div
              className={`relative flex flex-col overflow-x-hidden ${
                loc.pathname === "/services" || loc.pathname === "/"
                  ? "basis-[100%]"
                  : "basis-[90%]"
              } overflow-y-auto`}
            >
              <Outlet />
            </div>
            {user && loc.pathname !== "/services" && (
              <div className="flex basis-[10%] overflow-hidden">
                <BotNav />
              </div>
            )}
          </div>
        }
      >
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<RiderHome />} />
        <Route path="/activity" element={<RiderActivity />} />
        <Route path="/services" element={<RiderServices />} />
        <Route path="/map" element={<RiderMap />} />
        <Route path="/account" element={<RiderAccount />} />
        <Route path="*" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default Paths;
