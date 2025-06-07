import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CaptainRegister = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleCapacity: 1,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
      vehicle: {
        color: data.vehicleColor,
        plate: data.vehiclePlate,
        capacity: data.vehicleCapacity,
        vehicleType: data.vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain
    );
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      vehicleType: "",
      vehicleColor: "",
      vehiclePlate: "",
      vehicleCapacity: 1,
    });
  };
  return (
    <div className="py-5 px-5 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="logo"
        />
        <form className="flex flex-col " onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-lg mb-2 font-medium">What's your name</h3>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              name="firstname"
              value={data.firstname}
              onChange={(e) => {
                handleChange(e);
              }}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border  text-lg placeholder:text-base  w-1/2"
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastname"
              value={data.lastname}
              onChange={(e) => {
                handleChange(e);
              }}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border text-lg placeholder:text-base w-1/2"
            />
          </div>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            type="email"
            placeholder="email@example.com"
            name="email"
            value={data.email}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-4"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-4"
          />
          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-4">
              <select
                name="vehicleType"
                value={data.vehicleType}
                onChange={handleChange}
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              >
                <option value="">Select vehicle type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
              </select>
              <input
                type="text"
                placeholder="Vehicle color"
                name="vehicleColor"
                value={data.vehicleColor}
                onChange={handleChange}
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Vehicle plate"
                name="vehiclePlate"
                value={data.vehiclePlate}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              />
              <input
                type="number"
                placeholder="Vehicle capacity"
                name="vehicleCapacity"
                value={data.vehicleCapacity}
                onChange={handleChange}
                min={1}
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#111] rounded px-4 py-2  w-full text-lg  cursor-pointer text-[#fff] 
             mb-3
          font-semibold"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-lg">
          Already have a account? &nbsp;
          <Link className="text-blue-600 cursor-pointer>" to="/captain-signin">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By signing up, you agree to our{" "}
          <span className="underline">Terms of Service</span>,{" "}
          <span className="underline">Privacy Policy</span>, and{" "}
          <span className="underline">Community Guidelines</span>. We may use
          your data to provide and improve our services, and ensure a safe
          experience for all users.
        </p>
      </div>
    </div>
  );
};

export default CaptainRegister;
