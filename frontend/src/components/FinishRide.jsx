import React from "react";
import { IoIosArrowDown } from "react-icons/io";

import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const FinishRide = ({ setFinishedPanelOpen, rideData }) => {
  const navigate = useNavigate();
  const finishedRide = async () => {
    try {
      console.log("finish ride enabled", rideData._id);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/finish-ride`,
        {
          rideId: rideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        }
      );
      console.log(response);
      if (response.status === 200 && !response.data.error) {
        setFinishedPanelOpen(false);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        <h5
          onClick={() => {
            setFinishedPanelOpen(false);
          }}
          className="absolute top-0 p-2 left-45 text-2xl text-black"
        >
          <IoIosArrowDown />
        </h5>
        <h3 className="text-2xl font-semibold mb-5 ">Finish this Ride</h3>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6 bg-green-200 rounded-xl p-3">
            <div className="flex gap-2 justify-start items-center">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
                alt="random"
              />
              <div className="flex flex-col justify-start">
                <h4 className="text-lg font-medium capitalize">
                  {rideData?.user.fullname.firstname}
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
                <p className="text-sm text-gray-600 -mt-1">
                  {rideData?.pickup}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 border-b-1 border-t-1 p-3">
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
            <div className="flex items-center gap-4 p-3">
              <FaMoneyBill className="text-lg" />
              <div>
                <h3 className="font-medium text-lg">₹{rideData?.fare}</h3>
                <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => finishedRide()}
              className="w-full bg-green-600 mt-4 mb-4 flex justify-center text-white items-center font-semibold text-lg p-2 rounded-lg"
            >
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
