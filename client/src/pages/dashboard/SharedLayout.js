import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <div className="sidebar_left">
        <Sidebar />

        <div className="main_page">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SharedLayout;
