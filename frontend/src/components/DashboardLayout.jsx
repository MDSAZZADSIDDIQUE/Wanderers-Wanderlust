import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const HomeLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
