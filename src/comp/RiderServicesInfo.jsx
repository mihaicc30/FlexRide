import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegSadTear } from "react-icons/fa";
import { calculateFare } from "./calculateFare";
import Car1 from "../assets/car1";
import Car2 from "../assets/car2";
import Car3 from "../assets/car3";
import Car4 from "../assets/car4";
import { AppContext } from "../App";
import { useContext, useState } from "react";
import RiderServiceSearchDriver from "./RiderServiceSearchDriver";

export default function RiderServicesInfo({ direction }) {
  const [sorryModal, setSetsorryModal] = useState(false);

  const { typeOfService, updateContext, userGPS } = useContext(AppContext);
  // travel data- to store elsewhere
  // let miles = direction[1].routes[0].legs[0].distance.text;
  // let minutes = direction[1].routes[0].legs[0].duration.text;
  let miles = direction[1].routes[0].legs[0].distance.value;
  let minutes = direction[1].routes[0].legs[0].duration.value;
  let traffic = "low";

  let services = [
    {
      type: "basic",
      icon: <Car1 />,
      price: calculateFare(minutes, miles, "basic", traffic),
      onClick: () => {
        typeOfService
          ? null
          : updateContext({
              priceOfService: calculateFare(minutes, miles, "basic", traffic),
              typeOfService: "basic",
            });
      },
    },
    {
      type: "7 seater",
      icon: <Car2 />,
      price: calculateFare(minutes, miles, "7 seater", traffic),
      onClick: () => {
        typeOfService
          ? null
          : updateContext({
              priceOfService: calculateFare(
                minutes,
                miles,
                "7 seater",
                traffic
              ),
              typeOfService: "7 seater",
            });
      },
    },
    {
      type: "premium",
      icon: <Car3 />,
      price: calculateFare(minutes, miles, "premium", traffic),
      onClick: () => {
        typeOfService
          ? null
          : updateContext({
              priceOfService: calculateFare(minutes, miles, "premium", traffic),
              typeOfService: "premium",
            });
      },
    },
    {
      type: "lux",
      icon: <Car4 />,
      price: calculateFare(minutes, miles, "lux", traffic),
      onClick: () => {
        typeOfService
          ? null
          : updateContext({
              priceOfService: calculateFare(minutes, miles, "lux", traffic),
              typeOfService: "lux",
            });
      },
    },
  ];

  return (
    <>
      {sorryModal && (
        <div
          className={`bgModal absolute inset-0 bg-black/40 z-20`}
          onClick={(e) =>
            String(e.target.className).startsWith("bgModal")
              ? setSetsorryModal(false)
              : null
          }
        >
          <div
            className={`mainModal absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  w-[80vw] h-[70vh] max-w-[500px] max-h-[700px] z-30  bg-gray-200 flex flex-col justify-center items-center p-4 gap-4 rounded-lg`}
          >
            <span className="w-[120px] h-[120px] flex justify-center items-center">
              <FaRegSadTear className="text-[100px] text-gray-600 bg-white p-2 rounded-full" />
            </span>
            <p className="text-3xl font-[600]">Sorry!</p>
            <p className="text-center text-lg">
              No drivers are available for your trip. Please try again later or
              choose a different service ride.
            </p>
          </div>
        </div>
      )}
      {direction && typeOfService && (
        <RiderServiceSearchDriver setSetsorryModal={setSetsorryModal} />
      )}
      <div
        className={`flex ${
          typeOfService ? "flex-wrap justify-center" : "flex-col"
        } transition`}
      >
        {direction && (
          <>
            <div
              className={`flex flex-wrap gap-2 ${
                typeOfService ? "p-1  justify-center" : "p-4"
              }`}
            >
              {userGPS && (
                <div
                  className={`flex bg-gray-200 rounded-xl flex-col border-2 border-dashed border-[#0000ff8c] w-fit ${
                    typeOfService ? "p-1" : "p-4"
                  }`}
                >
                  <p>
                    <span
                      className={`font-[600] ${
                        typeOfService ? "text-sm" : "text-lg"
                      }`}
                    >
                      {direction[0].routes[0].legs[0].duration.text}
                    </span>{" "}
                    <span className="text-xs text-gray-500">
                      {direction[0].routes[0].legs[0].distance.text}
                    </span>
                  </p>
                  <p>Walking to pickup </p>
                </div>
              )}
              <div
                className={`flex bg-gray-200 rounded-xl flex-col border-2 border-[#0000ff8c] w-fit ${
                  typeOfService ? "p-1" : "p-4"
                }`}
              >
                <p>
                  <span
                    className={`font-[600] ${
                      typeOfService ? "text-sm" : "text-lg"
                    }`}
                  >
                    {direction[1].routes[0].legs[0].duration.text}
                  </span>{" "}
                  <span className="text-xs text-gray-500">
                    {direction[1].routes[0].legs[0].distance.text}
                  </span>
                </p>
                <p>Driving to dropoff </p>
              </div>
            </div>
            <div
              className={`flex gap-2 overflow-hidden ${
                typeOfService ? "rounded-xl" : "flex-col p-2 "
              }`}
            >
              {!typeOfService && (
                <div className="flex gap-x-4 px-2">
                  <AiOutlineLoading3Quarters className="animate-spin my-auto" />
                  <p>Select type of service</p>
                </div>
              )}
              <div
                className={`flex gap-4 overflow-y-hidden  ${
                  typeOfService ? "p-1" : "p-2 overflow-x-auto"
                }`}
              >
                {services.map((service) => {
                  if (
                    (typeOfService && typeOfService === service.type) ||
                    !typeOfService
                  )
                    return (
                      <div
                        className={`flex ${
                          typeOfService
                            ? "flex p-1"
                            : "flex-col max-w-[200px] min-w-[180px] active:scale-[1.1] "
                        } justify-center items-center bg-gray-200 rounded-xl flex-1 transition animate-fadeUP`}
                        key={service.type}
                        onClick={service.onClick}
                      >
                        <span
                          className={`px-2 ${
                            typeOfService ? "" : "pt-2"
                          } font-bold`}
                        >
                          £
                          {calculateFare(minutes, miles, service.type, traffic)}
                        </span>
                        <span
                          className={`px-2 ${
                            typeOfService ? "" : "pb-2"
                          } text-xl capitalize`}
                        >
                          {service.type}
                        </span>
                        <span
                          className={`h-12 w-12 ${
                            typeOfService ? "my-auto" : ""
                          }`}
                        >
                          {service.icon}
                        </span>
                      </div>
                    );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
