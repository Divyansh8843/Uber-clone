import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import LiveTracking from "../components/LiveTracking";
import { useNavigate } from "react-router-dom";
const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
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
      <div className="flex flex-col items-center p-4  absolute bg-gray-100 h-1/2">
        <svg
          className="w-20 h-20 my-2 text-green-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="currentColor"
            strokeWidth="4"
            fill="#d1fae5"
          />
          <path
            d="M16 24l6 6 10-12"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <h3 className="text-xl mt-2 text-gray-900 font-semibold text-center">
          Payment Done
        </h3>
        <p className="text-base font-medium text-center my-2 text-gray-600">
          Thankyou for Completing your secure online Payment
        </p>
        <p className="text-base my-2">Have a greate day!</p>
        <button
          onClick={() => handleClick()}
          className="w-full p-2 mt-5 bg-blue-500 rounded-lg text-lg"
        >
          Ok
        </button>
      </div>
    </div>
  );
};
export default CheckoutSuccess;
