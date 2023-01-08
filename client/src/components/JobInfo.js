import React from "react";

const JobInfo = ({ icon, text }) => {
  return (
    <div>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default JobInfo;
