import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="form-label"
        style={{ fontWeight: "bold" }}
      >
        {labelText || name}
      </label>

      <input type={type} name={name} value={value} onChange={handleChange} />

      <br />
      <br />
    </>
  );
};

export default FormRow;
