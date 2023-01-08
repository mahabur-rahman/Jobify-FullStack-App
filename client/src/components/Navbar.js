import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { user, logoutUser } = useAppContext();

  return (
    <>
      <div className="navbar">
        <div className="dropdown" style={{ marginLeft: "50rem" }}>
          <button className="dropbtn">
            {user?.name}
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <span type="button" onClick={logoutUser}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
