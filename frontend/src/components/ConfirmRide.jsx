import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
const ConfirmRide = ({
  closeConfirmed,
  setConfirmedOpen,
  setDriverConfirmation,
  pickup,
  destination,
  fares,
  createRide,
  vehicleType,
}) => {
  const setimage = {
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    car: "https://www.svgrepo.com/show/408291/car-white.svg",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
  };
  return (
    <div>
      <h5
        ref={closeConfirmed}
        onClick={() => setConfirmedOpen(false)}
        className="absolute opacity-0 top-0 p-2 left-45 text-2xl text-gray-300"
      >
        <IoIosArrowDown />
      </h5>
      <h3 className="text-2xl font-semibold mb-5 ">Confirm your ride</h3>
      <div className="flex flex-col gap-2 justify-between items-center">
        <img
          className="h-25"
          src={
            setimage[vehicleType] ||
            "https://www.svgrepo.com/show/408291/car-white.svg"
          }
          alt="uber_car"
        />
        <div className="w-full">
          <div className="flex items-center gap-4 border-b-1 p-3">
            <FaLocationDot className="text-lg" />
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">{pickup}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 border-b-1 p-3">
              <FaLocationCrosshairs className="text-lg" />
              <div>
                <h3 className="font-medium text-lg">562/11-A</h3>
                <p className="text-sm text-gray-600 -mt-1">{destination}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4  p-3">
              <FaMoneyBill className="text-lg" />
              <div>
                <h3 className="font-medium text-lg">₹{fares[vehicleType]}</h3>
                <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            {
              createRide(vehicleType);
              setDriverConfirmation(true);
              setConfirmedOpen(false);
            }
          }}
          className="w-full bg-blue-600 font-semibold text-lg p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
