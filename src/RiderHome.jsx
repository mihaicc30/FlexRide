import { MdMenu } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { BsArrowRight } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Logo } from "./comp/Logo";
import { AppContext } from "./App";
import AddressAutocomplete from "./comp/AddressAutocomplete";
import Car1 from "./assets/car1";
import Car2 from "./assets/car2";
import Car3 from "./assets/car3";
import Car4 from "./assets/car4";



export function RiderHome() {
  const nav = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) nav("/");
  }, [user]);

  const {
    fromLocationDescription,
    fromLocationCoords,
    toLocationDescription,
    toLocationCoords,
    updateContext,
  } = useContext(AppContext);


  // useEffect(() => {
  //   const ifValidCoords = (from, to) => {
  //     if (from !== false && to !== false) {
  //       nav("/services");
  //     }
  //   };
  //   ifValidCoords(fromLocationCoords, toLocationCoords);
  // }, [fromLocationCoords, toLocationCoords]);
  const ifValidCoords = () => {
    if (
      fromLocationDescription !== false &&
      fromLocationCoords.lat !== false &&
      toLocationDescription !== false &&
      toLocationCoords.lat !== false
    ) {
      nav("/services");
    }
  };

  return (
    <>
      <Logo />
      <div className="flex flex-col overflow-y-scroll w-[100%] overflow-x-hidden">
        <p className="p-4 text-xl font-[600]">Hi, {user?.displayName}! Start your new journey!</p>
        <AddressAutocomplete point={"from"} />
        <AddressAutocomplete point={"to"} />
        {fromLocationDescription &&
          fromLocationCoords.lat &&
          toLocationDescription &&
          toLocationCoords.lat && (
            <button
              onClick={ifValidCoords}
              className={`px-12 py-4 bg-green-500 text-xl font-[600] w-fit rounded-full ml-auto mr-4 mt-4 animate-pulse`}
            >
              Find a Taxi!
            </button>
          )}

        <p className="p-4 text-xl font-[600] mt-[5svh]">Last Activity</p>
        <div className="flex flex-col gap-4 mb-[10svh]">
          <div
            className="flex flex-nowrap justify-between"
            onClick={() => {
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
            }}
          >
            <span className="text-3xl m-auto p-2">
              <FaLocationDot />
            </span>
            <div className="flex flex-col flex-1 px-4 overflow-hidden">
              <p className="whitespace-nowrap text-ellipsis overflow-hidden ">
                Fuego Neapolitan Pizza & Grill, Foregate Street, Worcester, UK
              </p>
              <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] text-xs text-gray-500">
                35 Foregate St, Worcester
              </p>
            </div>
            <span className="text-3xl m-auto p-2">
              <FaChevronRight />
            </span>
          </div>

          <div
            className="flex flex-nowrap justify-between"
            onClick={() => {
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
            }}
          >
            <span className="text-3xl m-auto p-2 active:scale-[.96] transition">
              <FaLocationDot />
            </span>
            <div className="flex flex-col flex-1 px-4 overflow-hidden active:scale-[.96] transition">
              <p className="whitespace-nowrap text-ellipsis overflow-hidden ">
                7 Dove Close, Worcester, UK
              </p>
              <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] text-xs text-gray-500">
                WR4 9EA
              </p>
            </div>
            <span className="text-3xl m-auto p-2 active:scale-[.96] transition">
              <FaChevronRight />
            </span>
          </div>
        </div>

        <div className="flex flex-nowrap justify-between">
          <p className="p-4 text-xl font-[600]">Suggestions</p>
          <p className="p-4">See all</p>
        </div>
        <div className="flex flex-nowrap px-4 gap-x-4 overflow-x-auto min-h-[250px] pb-2 mb-[5svh] items-center">
          <div className="flex flex-col justify-center bg-gray-200 py-8 px-12 rounded-xl active:scale-[.96] transition h-[200px] min-w-[240px] relative">
            <span className="bg-green-600 text-white font-bold rounded-full text-center absolute px-2 py-1 -top-[10px] left-1/2 -translate-x-1/2">
              Promo
            </span>
            <span className=" h-[80px] mx-auto w-[80px]">
              <Car1 />
            </span>
            <p className="mt-auto text-center">Trip</p>
          </div>
          <div className="flex flex-col justify-center bg-gray-200 py-8 px-12 rounded-xl active:scale-[.96] transition h-[200px] min-w-[240px]">
            <span className="h-[80px] mx-auto w-[80px]">
              <Car2 />
            </span>
            <p className="mt-auto text-center">Coach</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-200 py-8 px-12 rounded-xl active:scale-[.96] transition h-[200px] min-w-[240px] relative">
            <span className="bg-green-600 text-white font-bold rounded-full text-center absolute px-2 py-1 -top-[10px] left-1/2 -translate-x-1/2">
              Promo
            </span>
            <span className="text-[5rem]  h-[100px] w-[100px]">
              <FcCalendar className="mx-auto" />
            </span>
            <p className="mt-auto text-center">Reserve</p>
          </div>
          <div className="flex flex-col justify-center bg-gray-200 py-8 px-12 rounded-xl active:scale-[.96] transition h-[200px] min-w-[240px]">
            <span className="text-3xl  relative h-[80px] w-[80px] mx-auto">
              <img
                src="./assets/carHire.png"
                alt=""
                className="w-[100%] h-[100%]"
              />
            </span>
            <p className="mt-auto text-center">Rent</p>
          </div>
        </div>

        <p className="p-4 text-xl font-[600]">Easy car hire</p>
        <div className="flex flex-nowrap px-4 gap-x-4 overflow-x-auto min-h-[250px] pb-2 mb-[5svh]">
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (1).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Rent a car and go <BsArrowRight />
            </p>
            <p className="text-sm">Rent for your next business trip</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (2).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Book a hire car <BsArrowRight />
            </p>
            <p className="text-sm">Seek adventure, set out together</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (3).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Go on a road trip together
            </p>
            <p className="text-sm">Rent a roomy car to fit everyone</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (4).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Choose your hire car
            </p>
            <p className="text-sm">Easily compare and book a trip</p>
          </div>
        </div>

        <p className="p-4 text-xl font-[600]">Plan your next trip</p>
        <div className="flex flex-nowrap px-4 gap-x-4 overflow-x-auto min-h-[250px] pb-2 mb-[5svh]">
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (5).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Reserve and relax
            </p>
            <p className="text-sm">Book up to 90 days in advance</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (6).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Trains and coach travel
            </p>
            <p className="text-sm">Get 10% back in Flex Credits</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (7).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              For XL groups
            </p>
            <p className="text-sm">Room for the whole crew and bags</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG.aUmA7t9sokQqd.jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Easy car hire
            </p>
            <p className="text-sm">Take the wehel and get going</p>
          </div>
        </div>

        <p className="p-4 text-xl font-[600]">Reserve ahead</p>
        <div className="flex flex-nowrap px-4 gap-x-4 overflow-x-auto min-h-[250px] pb-2 mb-[5svh]">
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG.jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Reserve for events
            </p>
            <p className="text-sm">Meet up at the time you've agreed</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG.KH5.jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Plan for outings
            </p>
            <p className="text-sm">Reserve a trip ahead of time</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/taxiDriver.png"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Fly with ease
            </p>
            <p className="text-sm">Book airport trips 90 days ahead</p>
          </div>
          <div className="flex flex-col rounded-xl active:scale-[.96] transition h-[180px] min-w-[240px]">
            <img
              src="./assets/OIG (1).jpg"
              alt=""
              className="w-[100%] h-[90%] max-h-[180px] rounded-xl"
            />
            <p className="font-[600] flex items-center gap-x-4">
              Reserve work trips
            </p>
            <p className="text-sm">Perfect for business meetings</p>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 max-[500px]:grid-cols-1">
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
            <h2 className="text-xl font-bold text-center">
              🌟 Tailored for You
            </h2>
            <p className="text-center tracking-wide">
              FlexRide understands that one size doesn't fit all. Choose from
              our fleet of vehicles, including Basic, Premium, and Lux, each
              designed to suit your style and preferences. Ride like a VIP,
              because you deserve it.
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
              before you ride. Enjoy competitive pricing with no hidden fees.
              It's time to experience affordable luxury.
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
            <h2 className="text-xl font-bold text-center">
              🤳 Book with a Tap
            </h2>
            <p className="text-center tracking-wide">
              Booking a ride has never been this simple. With just a tap on your
              phone, your FlexRide will be on its way. Track your ride in
              real-time, communicate with your driver, and experience a
              hassle-free journey.{" "}
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}
