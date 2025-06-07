import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainRegister = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
    });
    setData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
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
          <div className="flex gap-4 mb-7">
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
          <h3 className="text-base mb-2 font-medium">What's your email</h3>
          <input
            type="email"
            placeholder="email@example.com"
            name="email"
            value={data.email}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
          />
          <button
            type="submit"
            className="bg-[#111] rounded px-4 py-2  w-full text-lg  cursor-pointer text-[#fff] 
          mb-3
          font-semibold"
          >
            Login
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
