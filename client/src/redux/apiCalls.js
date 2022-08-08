import { loginStart, loginFailure, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { request } from "../api/axios";
import LocalStorageService from "../api/localStorage";
import { navigate } from "react-dom";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await request.post("/auth/login", user);
    if (res) {
      console.log(res);
      LocalStorageService.setToken(res.data);
      // localStorage.setItem("AccessToken", res.data.AccessToken);
      // localStorage.setItem("RefreshToken", res.data.RefreshToken);
      dispatch(loginSuccess(res.data));
      console.log(res);
    }
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    // console.log(error.response.data.message);
  }
};

export const googleLogin = async (dispatch) => {
  try {
    const res = await request.get("/auth/google");
    if (res) {
      console.log(res);
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};
