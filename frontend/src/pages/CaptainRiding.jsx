import React from "react";
import { IoExitSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";
const CaptainRiding = () => {
  const finishedPanelRef = useRef(null);
  const [finishedPanelOpen, setFinishedPanelOpen] = useState(false);
  const location = useLocation();
  const rideData = location.state?.ride;
  useGSAP(
    function () {
      if (finishedPanelOpen) {
        gsap.to(finishedPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishedPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishedPanelOpen]
  );
  return (
    <div className="h-screen">
      <div className="fixed p-5 top-0 flex items-center w-screen justify-between">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
          className="w-16"
        />
        <Link
          to="/home"
          className="flex  h-10 w-10 items-center rounded-full bg-white  justify-center text-xl"
        >
          <IoExitSharp />
        </Link>
      </div>
      <div className="h-4/5 ">
        <LiveTracking />
      </div>
      <div
        onClick={() => {
          setFinishedPanelOpen(true);
        }}
        className="h-1/5 relative bg-yellow-500 flex justify-between items-center p-6"
      >
        <h5 className="absolute top-0 p-2 left-45 text-2xl text-black">
          <IoIosArrowDown />
        </h5>
        <h4 className="text-lg font-medium ">4 KM away</h4>
        <button
          onClick={() => {}}
          className=" bg-blue-700 mt-4 font-semibold tex*lg py-2 px-8 text-white rounded-lg"
        >
          Complete Ride
        </button>
      </div>
      <div
        ref={finishedPanelRef}
        className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
      >
        <FinishRide
          setFinishedPanelOpen={setFinishedPanelOpen}
          rideData={rideData}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
