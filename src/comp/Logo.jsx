import { FaChevronRight } from "react-icons/fa";

export function Logo() {
  return (
    <>
      <h1
        className={`flex items-center text-[5vw] max-sm:text-3xl font-bold text-start m-0 p-0 z-20 bg-green-500/80`}
      >
        <FaChevronRight className="text-[5vw] max-[500px]:text-[2rem] text-green-500/80 stroke-[40px] stroke-black"/>
        <FaChevronRight className="text-[5vw] max-[500px]:text-[2rem] text-green-500/80 stroke-[40px] stroke-black"/>
        FlexRide
      </h1>
    </>
  );
}
