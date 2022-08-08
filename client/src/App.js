import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import PageNotFound from "./pages/PageNotFound";
import Test from "./pages/Test";
import Logout from "./Components/Logout";
import React, { useEffect } from "react";
import { request } from "../src/api/axios";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import LocalStorageService from "../src//api/localStorage";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ResetPassword";
import ResetNewPassword from "./pages/ResetNewPassword";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  // useEffect(() => {
  //   const token = LocalStorageService.getAccessToken();

  //   if (token) {
  //     var decoded = jwt_decode(token);

  //     const getUser = async () => {
  //       user = await request.get(`/users/${decoded.id}`);
  //     };
  //     getUser();
  //   }
  // }, []);
  // console.log(user);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/home" /> : <Register />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/auth/resetpassword" element={<ResetPassword />} />
          <Route path="/auth/newpassword" element={<ResetNewPassword />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/search_items/:search_item" element={<Test />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
