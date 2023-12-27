import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CarShadow from "../assets/CarShadow";
import { AppContext } from "../App";
import { useContext, useEffect, useRef, useState } from "react";

export default function RiderServiceSearchDriver({ setSetsorryModal }) {
  const { updateContext } = useContext(AppContext);

  const [attempts, setAttempts] = useState(0);

  const matchDriver = () => {
    // for now, simulating a api data request
    setAttempts((prevValue) => {
      console.log(`Trying to match driver. Attempt: ${prevValue + 1}.`);
      return prevValue + 1;
    });
  };

  useEffect(() => {
    // Set up a timer to update the location every two seconds
    const timerId = setInterval(() => {
      matchDriver();
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (attempts > 5) {
      setSetsorryModal(true);
      updateContext({
        priceOfService: false,
        typeOfService: false,
      });
    }
  }, [attempts]);

  return (
    <>
      <div className={`flex gap-2 p-2 justify-between`}>
        <div className={`flex gap-2 p-2`}>
          <AiOutlineLoading3Quarters className="animate-spin my-auto" />
          <p>Searching for driver</p>
        </div>
        <button
          onClick={() => {
            updateContext({
              priceOfService: false,
              typeOfService: false,
            });
          }}
          className={`bg-gray-200 px-4 py-2 rounded-full`}
        >
          Cancel
        </button>
      </div>
      <div className={`flex gap-1 m-2 max-w-[100svw] flex-wrap `}>
        <div className={`flex gap-1 m-2 flex-nowrap`}>
          <span
            className={`w-14 h-14 rounded-full linear-background bg-gray-200`}
            style={{ animationDelay: "1s" }}
          ></span>
          <div className={`flex flex-col gap-1 flex-nowrap`}>
            <span
              className={`bg-gray-200 h-4 w-[30vw] rounded-full linear-background`}
              style={{ animationDelay: "1.2s" }}
            ></span>
            <span
              className={`bg-gray-200 h-4 w-[24vw] rounded-full linear-background`}
              style={{ animationDelay: "1.4s" }}
            ></span>
            <span
              className={`bg-gray-200 h-4 w-[10vw] rounded-full linear-background`}
              style={{ animationDelay: "1.6s" }}
            ></span>
          </div>
        </div>
        <div className={`flex gap-1 m-2 flex-nowrap`}>
          <span className={`w-14 h-14 rounded-full `}>
            <CarShadow />
          </span>
          <div className={`flex flex-col gap-1 flex-nowrap`}>
            <span
              className={`bg-gray-200 h-4 w-[30vw] rounded-full linear-background`}
              style={{ animationDelay: "1.5s" }}
            ></span>
            <span
              className={`bg-gray-200 h-4 w-[24vw] rounded-full linear-background`}
              style={{ animationDelay: "1.7s" }}
            ></span>
            <span
              className={`bg-gray-200 h-4 w-[10vw] rounded-full linear-background`}
              style={{ animationDelay: "1.9s" }}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
}
