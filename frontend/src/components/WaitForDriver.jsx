import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
const WaitForDriver = ({ closeDriverWaiting, setDriverWaited }) => {
  return (
    <div>
      <h5
        ref={closeDriverWaiting}
        onClick={() => setDriverWaited(false)}
        className="absolute  top-0 p-2 left-45 text-2xl text-gray-300"
      >
        <IoIosArrowDown />
      </h5>
      <div className="flex justify-between items-center">
        <img
          className="h-20"
          src="https://www.svgrepo.com/show/408291/car-white.svg"
          alt="uber_car"
        />
        <div className="text-right">
          <h2 className="font-medium text-lg">Divyansh</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">MP06 42 F54</h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alt</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-4 border-b-1 p-3">
            <FaLocationDot className="text-lg" />
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">Dimani Road, Morena</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 border-b-1 p-3">
              <FaLocationCrosshairs className="text-lg" />
              <div>
                <h3 className="font-medium text-lg">562/11-A</h3>
                <p className="text-sm text-gray-600 -mt-1">Ater Road, Morena</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4  p-3">
              <FaMoneyBill className="text-lg" />
              <div>
                <h3 className="font-medium text-lg">₹193.20</h3>
                <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitForDriver;
