import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
export const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/captain-signin");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setCaptain(response.data);
          // console.log(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captain-signin");
      });
  }, [token]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};
