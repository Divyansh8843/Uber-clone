import React, { useContext } from "react";
import { IoMdHome } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoMdSpeedometer } from "react-icons/io";
import { RiBookletLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-2 justify-start items-center">
          <img
            className="rounded-full h-12 w-12 object-cover"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt="random"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">₹295.20</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-6 items-center bg-yellow-100 rounded-xl w-full p-4">
        <div className="flex flex-col items-center">
          <IoMdTime className="text-2xl" />
          <h5 className="text-xl font-medium mb-2">10.7</h5>
          <p className="text-sm  text-gray-500">Hours Online</p>
        </div>
        <div className="flex flex-col items-center">
          <IoMdSpeedometer className="text-2xl" />
          <h5 className="text-xl font-medium mb-2">10.7</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div className="flex flex-col items-center">
          <RiBookletLine className="text-2xl" />
          <h5 className="text-xl font-medium mb-2">10.7</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
