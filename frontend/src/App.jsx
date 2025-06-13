import React, { useContext } from "react";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";
import Start from "./pages/Start";
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
import Home from "./pages/Home";
import { UserProtectedWrapper } from "./pages/UserProtectedWrapper";
import { CaptainProtectedWrapper } from "./pages/CaptainProtectedWrapper";
import CaptainHome from "./pages/CaptainHome";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route
            path="/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/signin" element={<UserLogin />} />
          <Route
            path="/logout"
            element={
              <UserProtectedWrapper>
                <UserLogout />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/riding"
            element={
              <UserProtectedWrapper>
                <Riding />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/captain-home"
            element={
              <CaptainProtectedWrapper>
                <CaptainHome />
              </CaptainProtectedWrapper>
            }
          />
          <Route path="/captain-register" element={<CaptainRegister />} />
          <Route path="/captain-signin" element={<CaptainLogin />} />
          <Route path="/captain-riding" element={<CaptainRiding />} />
          <Route
            path="/captain-logout"
            element={
              <CaptainProtectedWrapper>
                <CaptainLogout />
              </CaptainProtectedWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
