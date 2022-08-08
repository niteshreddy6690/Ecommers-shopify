import { configureStore } from "@reduxjs/toolkit";
import cartRedux from "./cartRedux";
import userRedux from "./userRedux";

export default configureStore({
  reducer: {
    cart: cartRedux,
    user: userRedux,
  },
});
