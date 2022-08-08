import React, { useEffect } from "react";
import Announcement from "../Components/Announcement";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Products from "../Components/Products";
import Slider from "../Components/Slider";
import jwt_decode from "jwt-decode";
import LocalStorageService from "../api/localStorage";
import { request } from "../api/axios";
import Test from "../Components/Test";
import ValidationTest from "../Components/ValidationTest";
import Test2 from "../Components/Test2";

function Home() {
  useEffect(() => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      var decoded = jwt_decode(token);

      const getUser = async () => {
        const res = await request.get(`/users/${decoded.id}`);
      };
      getUser();
    }
  }, []);

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
      <Test />
      {/* <ValidationTest></ValidationTest> */}
      {/* <Test2 /> */}
    </div>
  );
}

export default Home;
