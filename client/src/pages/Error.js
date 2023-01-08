import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h1 className="error">404, Not found page!</h1>{" "}
      <Link to="/">Back to home</Link>
    </>
  );
};

export default Error;
