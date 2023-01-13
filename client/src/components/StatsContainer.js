import React from "react";
import StatsItem from "./StatsItem";
import { useAppContext } from "../context/appContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import "../index.css";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0, // dynamic value
      icon: <FaSuitcaseRolling />,
      color: "color1",
      bcg: "bcg1",
    },
    {
      title: "interview scheduled",
      count: stats.interview || 0, // dynamic value
      color: "color2",
      bcg: "bcg2",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0, // dynamic value
      icon: <FaBug />,
      color: "color3",
      bcg: "bcg3",
    },
  ];

  return (
    <div>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />;
      })}
    </div>
  );
};

export default StatsContainer;
