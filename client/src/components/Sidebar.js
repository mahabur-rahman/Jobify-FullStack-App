import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const Sidebar = () => {
  return (
    <>
      {links.map((link) => {
        const { id, text, path, icon } = link;

        return (
          <>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? "active link" : "")}
              key={Math.random()}
            >
              <span>{icon}</span>
              {text}
            </NavLink>
            <br />
            <br />
          </>
        );
      })}
    </>
  );
};

export default Sidebar;
