import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const HomeLayout = () => {
  return (
    <div className="font-serif">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
