import React from "react";
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
import axios from "axios";
const ConfirmPayment = ({ ride, setConfirmedPayment }) => {
  const navigate = useNavigate();
  const RidePayment = async () => {
    try {
      console.log("ride Id at payment route", ride._id);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/bookings/checkout-session`,
        {
          params: {
            rideId: ride._id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.status !== 200) {
        console.log(response.data.message);
      } else if (response.data.session && response.data.session.url) {
        setConfirmedPayment(false);
        window.location.href = response.data.session.url;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <img
          className="h-25"
          src="https://www.svgrepo.com/show/408291/car-white.svg"
          alt="uber_car"
        />
        <div className="text-right">
          <h2 className="font-medium text-lg">
            {ride?.user.fullname.firstname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {ride?.captain.vehicle.plate}
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
                  {ride?.destination}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4  p-3">
              <FaMoneyBill className="text-lg" />
              <div>
                <h3 className="font-medium text-lg">₹{ride?.fare}</h3>
                <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => RidePayment()}
            className="w-full p-2 mt-5 bg-yellow-500 rounded-lg text-lg"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
