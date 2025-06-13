import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
const RidePopUp = ({ popcloseRef, confirmRide, ride }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5 ">New Ride Available!</h3>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4 bg-green-200 rounded-xl p-3">
          <div className="flex gap-2 justify-start items-center">
            <img
              className="rounded-full h-12 w-12 object-cover"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
              alt="random"
            />
            <div className="flex flex-col justify-start">
              <h4 className="text-lg font-medium">
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
        <div className=" flex  justify-between gap-20 w-full items-center mt-2">
          <button
            onClick={() => {
              setPopUpOpen(false);
            }}
            className="w-full bg-gray-300 font-semibold text-lg py-2  text-gray-700 rounded-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              confirmRide();
            }}
            className="w-full bg-blue-600 font-semibold text-lg p-2 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
