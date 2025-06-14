import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
const UserLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);
  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(data.email, data.password);
    // console.log(data);
    const userData = {
      email: data.email,
      password: data.password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/signin`,
      userData
    );
    // console.log(response);
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/home");
    }
    setData({
      email: "",
      password: "",
    });
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
            handlesubmit(e);
          }}
          className="flex flex-col "
        >
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            type="email"
            placeholder="email@example.com"
            name="email"
            value={data.email}
            onChange={(e) => {
              changeData(e);
            }}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              changeData(e);
            }}
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7"
          />
          <button
            type="submit"
            className="bg-[#111] rounded px-4 py-2  w-full text-lg placeholder:text-base cursor-pointer text-[#fff] 
            mb-3
            font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center text-lg">
          Register here? &nbsp;
          <Link className="text-blue-600 cursor-pointer>" to="/register">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="bg-yellow-600 rounded px-4 py-2  w-full text-lg placeholder:text-base mb-5 cursor-pointer text-[#fff] font-semibold flex items-center justify-center"
          to="/captain-signin"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
