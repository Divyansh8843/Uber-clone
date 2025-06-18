import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRedepopUp = ({ setConfirmPopUpOpen, ride }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(ride._id, otp, ride);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: ride._id,
            otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response send");
      console.log(response.status);
      if (response.status === 200 && !response.data.error) {
        setConfirmPopUpOpen(false);
        navigate("/captain-riding", { state: { ride: ride } });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5 ">
        Confirm this Ride to start
      </h3>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4 bg-green-200 rounded-xl p-3">
          <div className="flex gap-2 justify-start items-center">
            <img
              className="rounded-full h-12 w-12 object-cover"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
              alt="random"
            />
            <div className="flex flex-col justify-start">
              <h4 className="text-lg font-medium capitalize">
                {ride?.user.fullname.firstname +
                  " " +
                  ride?.user.fullname.lastname}
              </h4>
              <div className="flex gap-2 items-center w-full">
                <div className="bg-yellow-400 px-3 py-0.5 rounded-full text-center">
                  <h4 className="text-xs font-medium">Applepay</h4>
                </div>
                <div className="bg-yellow-400 px-3 py-0.5 rounded-full text-center">
                  <h4 className="text-xs font-medium">Discount</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-lg font-medium">2.2 Km</h5>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 border-b-1 p-3">
            <FaLocationCrosshairs className="text-lg" />
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">{ride?.pickup}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 border-b-1 border-t-1 p-3">
            <FaLocationCrosshairs className="text-lg" />
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">{ride?.destination}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 p-3">
            <FaMoneyBill className="text-lg" />
            <div>
              <h3 className="font-medium text-lg">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-8 ">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className=" w-full py-4 px-6 font-semibold placeholder:font-normal  border-1 rounded-lg text-lg bg-[#eee] mb-2"
              type="number"
              placeholder="Enter OTP"
              name="otp"
              value={otp}
              required
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 mt-4 flex justify-center text-white items-center font-semibold text-lg p-2 rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={() => {
                setConfirmPopUpOpen(false);
              }}
              className="w-full bg-red-600 mt-2 font-semibold text-lg p-2 text-white rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRedepopUp;
