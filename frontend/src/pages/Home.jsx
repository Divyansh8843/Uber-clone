import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import PanelComponent from "../components/PanelComponent";
import VehiclePanelComponent from "../components/VehiclePanelComponent";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/userContext";
import LiveTracking from "../components/LiveTracking";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [active, setActive] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState("");
  const [confirmedOpen, setConfirmedOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [driverConfirmation, setDriverConfirmation] = useState(false);
  const [driverWaited, setDriverWaited] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const vehicleRef = useRef(null);
  const panelRef = useRef(null);
  const iconRef = useRef(null);
  const closeDriverLooking = useRef(null);
  const closeVehicle = useRef(null);
  const confirmedVehicleRef = useRef(null);
  const DriverPanelRef = useRef(null);
  const [fares, setFares] = useState("");
  const DriverWaitedRef = useRef(null);
  const closeDriverWaiting = useRef(null);
  const closebutton = useRef("");
  const [panelOpen, setPanelOpen] = useState(false);
  const { captain } = useContext(CaptainDataContext);

  const { user } = useContext(UserDataContext);
  const { sendMessage, recieveMessage, socket } = useContext(SocketContext);
  const closeConfirmed = useRef(null);
  const handlepickupChange = async (e) => {
    setPickup(e.target.value);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: {
          input: e.target.value,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPickupSuggestions(response.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handledestinationChange = async (e) => {
    setDestination(e.target.value);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: {
          input: e.target.value,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setDestinationSuggestions(response.data);
  };
  const handlePanelSubmit = async () => {
    setPanelOpen(false);
    setVehicleOpen(true);
    const addressData = {
      pickup,
      destination,
    };
    console.log(addressData);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/findfare`,
      addressData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response.data);
    setFares(response.data);
  };
  async function createRide(vehicleType) {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }
  useEffect(() => {
    sendMessage("join", {
      userType: "user",
      userId: user._id,
    });
  }, [user]);
  recieveMessage("ride-confirm", (ride) => {
    console.log("Data with message for user");
    console.log("ride confirmed", ride);
    setRide(ride);
    setDriverWaited(true);
    setDriverConfirmation(false);
  });
  recieveMessage("ride-started", (ride) => {
    console.log("Data with message for user for start ride");
    // console.log(ride);
    setDriverWaited(false);
    navigate("/riding", { state: { ride: ride } });
  });
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
        gsap.to(closebutton.current, {
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
        gsap.to(closebutton.current, {
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
          height: "100%",
        });
        gsap.to(closeDriverWaiting.current, {
          opacity: "1",
        });
      } else {
        gsap.to(DriverWaitedRef.current, {
          transform: "translateY(100%)",
          height: "0",
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
        className="w-16 absolute top-20 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      ></img>
      <div className="h-screen w-screen">
        <LiveTracking />
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
                onClick={() => {
                  setPanelOpen(true);
                }}
                placeholder="Add a pick-up location"
                name="pickup"
                value={pickup}
                onFocus={() => {
                  setActive("pickup");
                }}
                required
                onChange={(e) => handlepickupChange(e)}
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg w-full rounded-lg"
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                }}
                placeholder="Enter your destination"
                name="destination"
                required
                onFocus={() => {
                  setActive("destination");
                }}
                value={destination}
                onChange={(e) => handledestinationChange(e)}
              />
            </form>
            <button
              ref={closebutton}
              type="submit"
              onClick={() => {
                handlePanelSubmit();
              }}
              className="w-full bg-blue-500 font-semibold  text-lg px-4 py-2 mt-5  rounded-lg"
            >
              Find Trip
            </button>
          </div>
          <div ref={panelRef} className=" bg-white h-[0%]">
            {/* Panel component */}
            <PanelComponent
              setPickup={setPickup}
              setDestination={setDestination}
              active={active}
              suggestions={
                Array.isArray(
                  active === "pickup"
                    ? pickupSuggestions
                    : destinationSuggestions
                )
                  ? active === "pickup"
                    ? pickupSuggestions
                    : destinationSuggestions
                  : []
              }
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
            fares={fares}
            setVehicle={setVehicleType}
          />
        </div>
        <div
          ref={confirmedVehicleRef}
          className="fixed z-10 bottom-0 bg   bg-white px-3 pb-6 pt-12 mt-4 w-full translate-y-full"
        >
          <ConfirmRide
            closeConfirmed={closeConfirmed}
            setConfirmedOpen={setConfirmedOpen}
            setDriverConfirmation={setDriverConfirmation}
            pickup={pickup}
            destination={destination}
            fares={fares}
            createRide={createRide}
            vehicleType={vehicleType}
          />
        </div>
        <div
          ref={DriverPanelRef}
          className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
        >
          <LookingForDriver
            setDriverConfirmation={setDriverConfirmation}
            closeDriverLooking={closeDriverLooking}
            fares={fares}
            vehicleType={vehicleType}
            pickup={pickup}
            destination={destination}
          />
        </div>
        <div
          ref={DriverWaitedRef}
          className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
        >
          <WaitForDriver
            closeDriverWaiting={closeDriverWaiting}
            setDriverWaited={setDriverWaited}
            ride={ride}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
