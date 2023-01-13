import React from "react";

const StatsItem = ({ count, title, icon, color, bcg }) => {
  return (
    <>
      <div className={`${color} ${bcg}`}>
        <div>{count}</div>
        <div>{icon}</div>
        <h3>{title}</h3>
      </div>
    </>
  );
};

export default StatsItem;
