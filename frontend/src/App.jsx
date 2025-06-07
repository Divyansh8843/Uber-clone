import React, { useContext } from "react";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import CaptainRegister from "./pages/CaptainRegister";
import CaptainLogin from "./pages/CaptainLogin";
import { UserDataContext } from "./context/userContext";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/signin" element={<UserLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/captain-register" element={<CaptainRegister />} />
          <Route path="/captain-signin" element={<CaptainLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
