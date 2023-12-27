import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Logo } from "./comp/Logo";
import {
  FaFacebookSquare,
  FaYoutube,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { VscVerifiedFilled } from "react-icons/vsc";

import GooglePlay from "./assets/googlePlay";

export function Auth() {
  const nav = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) nav("/home");
  }, [user]);

  return (
    <div className="flex flex-col min-h-[100%]">
      <Logo />
      <div className="flex flex-col mt-[20vh]">
        <h2 className="text-3xl font-bold text-center px-4">
          Revolutionizing Your Journey,
        </h2>
        <h2 className="text-3xl font-bold text-center px-4 mb-12">
          One Ride at a Time.
        </h2>
        <h3 className="text-3xl font-[600] text-center px-4">
          Welcome to FlexRide
        </h3>
        <h3 className="text-3xl font-[600] text-center px-4">
          Where Every Journey is an Experience!
        </h3>
      </div>
      {/* Log into FlexRide now and discover the future of transportation! */}
      <div className="flex flex-wrap max-w-[600px] mx-auto justify-center gap-8 my-20  relative">
        <div className="z-10">
          <p className="text-center text-lg font-[600]">Riders</p>
          <p className="text-center text-sm">Have somewhere to be?</p>
          <button
            className={`text-green-600 flex flex-nowrap gap-2 justify-center items-center border-2 font-bold bg-white/60 border-black/50 rounded-xl mx-auto p-2`}
            onClick={() => signInWithGoogle("riders")}
          >
            <FcGoogle className="text-3xl my-auto" />
            Sign In with Google
          </button>
          <button
            className={`text-green-600 flex flex-nowrap gap-2 justify-center items-center border-2 font-bold bg-white/60 border-black/50 rounded-xl mx-auto p-2 mt-2`}
            onClick={() => logInWithEmailAndPassword()}
          >
            <VscVerifiedFilled className="text-3xl my-auto" />
            Sign In with Test Account
          </button>
        </div>

        <img
          src="./assets/taxiDriver.png"
          alt=""
          className="opacity-20 blur-[2px] absolute left-0 right-0 bottom-0 z-0 scale-[3] rounded-full"
        />
      </div>

      <div>
        <h1 className="text-xl font-[600] text-center mt-20">🚗</h1>
        <p className="text-xl font-[600] text-center mb-20">
          Let us show you what to expect!
        </p>
      </div>

      <div className="grid grid-cols-2 max-[500px]:grid-cols-1">
        <div className="flex flex-col my-20 px-[5vw]">
          <h2 className="text-xl font-bold text-center">
            ⚡️ Fast Rides, Happy Vibes
          </h2>
          <p className="text-center tracking-wide">
            Need to be somewhere fast? FlexRide delivers swift and efficient
            rides, ensuring you reach your destination with time to spare. Say
            goodbye to waiting; say hello to prompt and reliable service.
          </p>
        </div>

        <div className="flex flex-col my-20 px-[5vw]">
          <h2 className="text-xl font-bold text-center">🌟 Tailored for You</h2>
          <p className="text-center tracking-wide">
            FlexRide understands that one size doesn't fit all. Choose from our
            fleet of vehicles, including Basic, Premium, and Lux, each designed
            to suit your style and preferences. Ride like a VIP, because you
            deserve it.
          </p>
        </div>

        <div className="flex flex-col my-20 px-[5vw]">
          <h2 className="text-xl font-bold text-center">
            🚦 Navigate with Ease
          </h2>
          <p className="text-center tracking-wide">
            Avoid traffic hassles with our intelligent route planning. We
            consider real-time traffic data to provide you with the smoothest
            and quickest routes, ensuring you always stay on the move.
          </p>
        </div>

        <div className="flex flex-col my-20 px-[5vw]">
          <h2 className="text-xl font-bold text-center">
            🌈 Your Safety, Our Priority
          </h2>
          <p className="text-center tracking-wide">
            Transparency is key. With FlexRide, you'll always know the cost
            before you ride. Enjoy competitive pricing with no hidden fees. It's
            time to experience affordable luxury.
          </p>
        </div>

        <div className="flex flex-col my-20 px-[5vw]">
          <h2 className="text-xl font-bold text-center">
            💰 Fair Pricing, No Surprises
          </h2>
          <p className="text-center tracking-wide">
            At FlexRide, safety isn't just a feature; it's a commitment. Our
            drivers undergo rigorous training, and our vehicles are equipped
            with state-of-the-art safety features, ensuring a secure journey
            every time.
          </p>
        </div>

        <div className="flex flex-col my-20 px-[5vw]">
          <h2 className="text-xl font-bold text-center">🤳 Book with a Tap</h2>
          <p className="text-center tracking-wide">
            Booking a ride has never been this simple. With just a tap on your
            phone, your FlexRide will be on its way. Track your ride in
            real-time, communicate with your driver, and experience a
            hassle-free journey.{" "}
          </p>
        </div>
      </div>

      <p className="text-3xl text-center mb-8 px-4">
        Join FlexRide now and redefine your travel experience!
      </p>
      <div className="z-10 mb-20">
        <p className="text-center text-lg font-[600]">Riders</p>
        <p className="text-center text-sm">Have somewhere to be?</p>
        <button
          className={`text-green-600 flex flex-nowrap gap-2 justify-center items-center border-2 rounded-xl mx-auto p-2`}
          onClick={() => signInWithGoogle("riders")}
        >
          <FcGoogle className="text-3xl my-auto" />
          Sign In with Google
        </button>
      </div>
      <p className="text-3xl text-center mb-8 px-4">
        Ready to elevate your ride?
      </p>
      <div className="z-10 pb-20">
        <p className="text-center text-lg font-[600]">Drivers</p>
        <p className="text-center text-sm">Looking for extra income?</p>
        <button
          className={`text-green-600 flex flex-nowrap gap-2 justify-center items-center border-2 rounded-xl mx-auto p-2`}
          onClick={() => alert("Not yet implemented")}
        >
          <FcGoogle className="text-3xl my-auto" />
          Sign In with Google
        </button>
      </div>

      <footer className="grid grid-cols-2  gap-4 bg-black p-4 ">
        <div className="col-span-2">
          <Logo />
        </div>

        <div className="grid grid-cols-4 max-sm:grid-cols-2 text-white tracking-wider col-span-2 justify-items-center gap-y-4">
          <div className="grid grid-cols-1  text-white tracking-wider">
            <span className="text-green-500/80">Company</span>
            <span>About Us</span>
            <span>Offerings</span>
            <span>Newsletter</span>
            <span>Blog</span>
            <span>Careers</span>
          </div>
          <div className="grid grid-cols-1  text-white tracking-wider mx-auto">
            <span className="text-green-500/80">Products</span>
            <span>Ride</span>
            <span>Drive</span>
            <span>Deliver</span>
            <span>Eat</span>
            <span>Business</span>
          </div>
          <div className="grid grid-cols-1  text-white tracking-wider">
            <span className="text-green-500/80">Involvment</span>
            <span>Safety</span>
            <span>Sustainability</span>
            <span>Diversity</span>
            <span>Inclusion</span>
            <span>Climate</span>
          </div>

          <div className="grid grid-cols-1  text-white tracking-wider">
            <span className="text-green-500/80">Travel</span>
            <span>Reserve</span>
            <span>Airports</span>
            <span>Cities</span>
            <span>Holidays</span>
            <span>Insurance</span>
          </div>
        </div>
        <div className="flex flex-nowrap min-[500px]:gap-x-4 text-white tracking-wider col-span-2 justify-items-center">
          <FaFacebookSquare className="hover:bg-white/50  text-5xl text-white p-3 rounded-xl transition duration-700" />
          <RiTwitterXFill className="hover:bg-white/50  text-5xl text-white p-3 rounded-xl transition duration-700" />
          <FaYoutube className="hover:bg-white/50  text-5xl text-white p-3 rounded-xl transition duration-700" />
          <FaLinkedin className="hover:bg-white/50  text-5xl text-white p-3 rounded-xl transition duration-700" />
          <FaInstagramSquare className="hover:bg-white/50  text-5xl text-white p-3 rounded-xl transition duration-700" />
        </div>

        <GooglePlay />
        <div className="grid grid-cols-7 text-white tracking-wider col-span-2 justify-items-center"></div>
        <div className="grid grid-cols-2 max-[500px]:grid-cols-1 text-white tracking-wider col-span-2 justify-items-center">
          <span className="w-[100%]">
            © {new Date().getFullYear()} FlexRide Tech Inc.
          </span>
          <div className="flex w-[100%] justify-end gap-4">
            <span>Privacy</span>
            <span>Accessibility</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
