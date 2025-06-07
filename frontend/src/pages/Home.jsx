import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className=" bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full bg-red-400 flex justify-between flex-col pt-8">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-[30px] font-bold">Get Started with Uber</h2>
          <Link
            className="w-full bg-black text-white py-3 cursor-pointer rounded-lg mt-4 flex items-center justify-center"
            to="/signin"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
