import React, { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { IoExitSharp } from "react-icons/io5";
import axios from "axios";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRedepopUp from "../components/ConfirmRedepopUp";
import LiveTracking from "../components/LiveTracking";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
const CaptainHome = () => {
  const PopupPanelRef = useRef(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [confirmPopUpOpen, setConfirmPopUpOpen] = useState(false);
  const ConfirmPanelRef = useRef(null);
  const [ride, setRide] = useState(null);
  const { captain } = useContext(CaptainDataContext);
  const { sendMessage, recieveMessage, socket } = useContext(SocketContext);
  useGSAP(
    function () {
      if (popUpOpen) {
        gsap.to(PopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(PopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [popUpOpen]
  );
  useGSAP(
    function () {
      if (confirmPopUpOpen) {
        gsap.to(ConfirmPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmPopUpOpen]
  );
  useEffect(() => {
    sendMessage("join", {
      userType: "captain",
      userId: captain._id,
    });
    const sendLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendMessage("update-location-captain", {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (error) => {
            // Handle error if needed
            console.log("errror occured", error.message);
          }
        );
      }
    };
    const intervalId = setInterval(sendLocation, 10000);
    sendLocation();
    return () => clearInterval(intervalId);
  }, [captain]);
  recieveMessage("new-ride", (data) => {
    console.log("Data for message for captain");
    console.log(data);
    setRide(data);
    console.log(data);
    setPopUpOpen(true);
  });
  async function confirmRide() {
    console.log(ride._id);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setPopUpOpen(false);
    setConfirmPopUpOpen(true);
  }
  return (
    <div className="h-screen w-screen fixed">
      <div className="absolute p-5 top-0 flex items-center w-full justify-between">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
          className="w-16"
        />
        <Link
          to="/captain-home"
          className="flex  h-10 w-10 items-center rounded-full bg-white  justify-center text-xl"
        >
          <IoExitSharp />
        </Link>
      </div>
      <div className="h-3/5 ">
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6 absolute bg-white w-full">
        <CaptainDetails />
      </div>
      <div
        ref={PopupPanelRef}
        className="fixed z-10 bottom-0 bg  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
      >
        <RidePopUp ride={ride} confirmRide={confirmRide} />
      </div>
      <div
        ref={ConfirmPanelRef}
        className="fixed z-10 bottom-0 bg h-screen  bg-white px-3 pb-6 pt-12 w-full translate-y-full"
      >
        <ConfirmRedepopUp
          ride={ride}
          setConfirmPopUpOpen={setConfirmPopUpOpen}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
