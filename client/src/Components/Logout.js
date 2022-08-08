import React from "react";
import LocalStorageService from "../api/localStorage";
import axios from "axios";
import { request } from "../api/axios";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const refreshToken = LocalStorageService.getRefreshToken();
  console.log("refreshToken: " + refreshToken);

  const handelLogout = () => {
    request.post("/auth/logout", { refreshToken }).then((response) => {
      console.log(response);
      localStorage.clear();
      navigate("/");
    });
  };
  return (
    <div>
      <button onClick={handelLogout}>Logout</button>
    </div>
  );
};

export default Logout;
