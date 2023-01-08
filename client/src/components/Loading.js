import React from "react";

const Loading = ({ center }) => {
  return <h2 className={center ? "loading" : "change_loading"}>Loading...</h2>;
};

export default Loading;
