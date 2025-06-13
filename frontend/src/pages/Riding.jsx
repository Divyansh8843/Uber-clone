import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Riding = () => {
  const navigate = useNavigate();
  const { sendMessage, recieveMessage, socket } = useContext(SocketContext);
  const location = useLocation();
  const rideData = location.state?.ride;
  recieveMessage("ride-ended", (ride) => {
    console.log("Data with message for user for end ride");
    // console.log(ride);
    navigate("/home");
  });

  return (
    <div className="h-screen w-screen fixed">
      <Link
        to="/home"
        className="flex  h-10 w-10 items-center absolute rounded-full bg-white  right-2 top-2 justify-center text-xl"
      >
        <IoMdHome />
      </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-4 absolute bg-white w-full">
        <div className="flex justify-between items-center">
          <img
            className="h-25"
            src="https://www.svgrepo.com/show/408291/car-white.svg"
            alt="uber_car"
          />
          <div className="text-right">
            <h2 className="font-medium text-lg">
              {rideData?.user.fullname.firstname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {rideData?.captain.vehicle.plate}
            </h4>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="w-full">
            <div>
              <div className="flex items-center gap-4 border-b-1 p-3">
                <FaLocationCrosshairs className="text-lg" />
                <div>
                  <h3 className="font-medium text-lg">562/11-A</h3>
                  <p className="text-sm text-gray-600 -mt-1">
                    {rideData?.destination}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4  p-3">
                <FaMoneyBill className="text-lg" />
                <div>
                  <h3 className="font-medium text-lg">₹{rideData?.fare}</h3>
                  <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full p-2 mt-5 bg-blue-500 rounded-lg text-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
