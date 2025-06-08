import React from "react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import PanelComponent from "../components/PanelComponent";
import VehiclePanelComponent from "../components/VehiclePanelComponent";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
const Home = () => {
  const [data, setData] = useState({
    location: "",
    destination: "",
  });
  const [confirmedOpen, setConfirmedOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [driverConfirmation, setDriverConfirmation] = useState(false);
  const [driverWaited, setDriverWaited] = useState(false);
  const vehicleRef = useRef(null);
  const panelRef = useRef(null);
  const iconRef = useRef(null);
  const closeDriverLooking = useRef(null);
  const closeVehicle = useRef(null);
  const confirmedVehicleRef = useRef(null);
  const DriverPanelRef = useRef(null);
  const DriverWaitedRef = useRef(null);
  const closeDriverWaiting = useRef(null);
  useRef;
  const [panelOpen, setPanelOpen] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const closeConfirmed = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: "24",
        });
        gsap.to(iconRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: "0",
        });
        gsap.to(iconRef.current, {
          opacity: "0",
        });
      }
    },
    [panelOpen]
  );
  useGSAP(
    function () {
      if (vehicleOpen) {
        gsap.to(vehicleRef.current, {
          transform: "translateY(0)",
        });
        gsap.to(closeVehicle.current, {
          opacity: "1",
        });
      } else {
        gsap.to(vehicleRef.current, {
          transform: "translateY(100%)",
        });
        gsap.to(closeVehicle.current, {
          opacity: "0",
        });
      }
    },
    [vehicleOpen]
  );
  useGSAP(
    function () {
      if (confirmedOpen) {
        gsap.to(confirmedVehicleRef.current, {
          transform: "translateY(0)",
        });
        gsap.to(closeConfirmed.current, {
          opacity: "1",
        });
      } else {
        gsap.to(confirmedVehicleRef.current, {
          transform: "translateY(100%)",
        });
        gsap.to(closeConfirmed.current, {
          opacity: "0",
        });
      }
    },
    [confirmedOpen]
  );
  useGSAP(
    function () {
      if (driverConfirmation) {
        gsap.to(DriverPanelRef.current, {
          transform: "translateY(0)",
        });
        gsap.to(closeDriverLooking.current, {
          opacity: "1",
        });
      } else {
        gsap.to(DriverPanelRef.current, {
          transform: "translateY(100%)",
        });
        gsap.to(closeDriverLooking.current, {
          opacity: "0",
        });
      }
    },
    [driverConfirmation]
  );
  useGSAP(
    function () {
      if (driverWaited) {
        gsap.to(DriverWaitedRef.current, {
          transform: "translateY(0)",
        });
        gsap.to(closeDriverWaiting.current, {
          opacity: "1",
        });
      } else {
        gsap.to(DriverWaitedRef.current, {
          transform: "translateY(100%)",
        });
        gsap.to(closeDriverWaiting.current, {
          opacity: "0",
        });
      }
    },
    [driverWaited]
  );
  return (
    <div className="w-screen h-screen fixed">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      ></img>
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt="map"
        />
        <div className=" fixed h-screen top-0 w-full flex flex-col justify-end">
          <div className="h-[30%] bg-white relative p-6">
            <h5
              ref={iconRef}
              onClick={() => setPanelOpen(false)}
              className="absolute opacity-0 top-8 right-6 text-2xl"
            >
              <IoIosArrowDown />
            </h5>
            <h4 className="text-3xl font-semibold mb-5">Find a trip</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="line absolute w-1 h-16 left-10 top-[48%] bg-gray-900 rounded-lg"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-3"
                type="text"
                onClick={() => setPanelOpen(true)}
                placeholder="Add a pick-up location"
                name="location"
                value={data.location}
                required
                onChange={(e) => handleChange(e)}
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg w-full rounded-lg"
                type="text"
                onClick={() => setPanelOpen(true)}
                placeholder="Enter your destination"
                name="destination"
                required
                value={data.destination}
                onChange={(e) => handleChange(e)}
              />
            </form>
          </div>
          <div ref={panelRef} className=" bg-white h-[0%]">
            {/* Panel component */}
            <PanelComponent
              setVehicleOpen={setVehicleOpen}
              setPanelOpen={setPanelOpen}
            />
          </div>
        </div>
        <div
          ref={vehicleRef}
          className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
        >
          <VehiclePanelComponent
            setVehicleOpen={setVehicleOpen}
            closeVehicle={closeVehicle}
            setConfirmedOpen={setConfirmedOpen}
          />
        </div>
        <div
          ref={confirmedVehicleRef}
          className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
        >
          <ConfirmRide
            closeConfirmed={closeConfirmed}
            setConfirmedOpen={setConfirmedOpen}
            setDriverConfirmation={setDriverConfirmation}
          />
        </div>
        <div
          ref={DriverPanelRef}
          className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
        >
          <LookingForDriver
            setDriverConfirmation={setDriverConfirmation}
            closeDriverLooking={closeDriverLooking}
          />
        </div>
        <div
          ref={DriverWaitedRef}
          className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
        >
          <WaitForDriver
            closeDriverWaiting={closeDriverWaiting}
            setDriverWaited={setDriverWaited}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
