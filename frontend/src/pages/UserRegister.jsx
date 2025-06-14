import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/";
import axios from "axios";
const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [userData, setUserData] = useState({});
  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setFirstname("");
    setLastname("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col "
        >
          <h3 className="text-lg mb-2 font-medium">What's your name</h3>
          <div className="flex gap-4 mb-7">
            <input
              type="text"
              placeholder="First name"
              name="firstname"
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-2 border  text-lg placeholder:text-base  w-1/2"
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastname"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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
            Create Account
          </button>
        </form>
        <p className="text-center text-lg">
          Already have a account? &nbsp;
          <Link className="text-blue-600 cursor-pointer>" to="/signin">
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

export default UserRegister;
