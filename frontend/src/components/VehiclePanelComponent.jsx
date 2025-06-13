import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
const VehiclePanelComponent = ({
  closeVehicle,
  setVehicleOpen,
  setConfirmedOpen,
  fares,
  setVehicle,
}) => {
  return (
    <div>
      <h5
        ref={closeVehicle}
        onClick={() => setVehicleOpen(false)}
        className="absolute opacity-0 top-0 p-2 left-45 text-2xl text-gray-300"
      >
        <IoIosArrowDown />
      </h5>
      <h3 className="text-2xl font-semibold mb-5 ">Choose a vehicle</h3>
      <div
        onClick={() => {
          setVehicle("car");
          setConfirmedOpen(true);
          setVehicleOpen(false);
        }}
        className="flex justify-between w-full items-center p-3 border-2  rounded-xl border-gray-400 active:border-black  mb-4 "
      >
        <img
          src="https://www.svgrepo.com/show/408291/car-white.svg"
          alt="uber_car"
          className="h-16"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base flex items-center gap-2">
            UberGo
            <span className="flex items-center text-sm gap-1">
              <FaUser />4
            </span>
          </h4>
          <h4 className="font-medium text-sm">2 mins away</h4>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{fares.car}</h2>
      </div>
      <div
        onClick={() => {
          setVehicle("moto");
          setConfirmedOpen(true);
          setVehicleOpen(false);
        }}
        className="flex justify-between w-full items-center p-3 border-2  rounded-xl border-gray-400 active:border-black  mb-4"
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="uber_bike"
          className="h-10"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base flex items-center gap-2">
            Moto
            <span className="flex items-center text-sm gap-1">
              <FaUser />1
            </span>
          </h4>
          <h4 className="font-medium text-sm">3 mins away</h4>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Motorcycle ride
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{fares.moto}</h2>
      </div>
      <div
        onClick={() => {
          setVehicle("auto");
          setConfirmedOpen(true);
          setVehicleOpen(false);
        }}
        className="flex justify-between w-full items-center p-3 border-2  rounded-xl border-gray-400 active:border-black   mb-4"
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="uber_auto"
          className="h-10"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base flex items-center gap-2">
            UberAuto
            <span className="flex items-center text-sm gap-1">
              <FaUser />3
            </span>
          </h4>
          <h4 className="font-medium text-sm">4 mins away</h4>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{fares.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanelComponent;
