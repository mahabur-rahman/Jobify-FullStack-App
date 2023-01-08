import React, { useState, useEffect } from "react";
import { FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  // showAlert: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  // global state and useNavigate
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
    setupUser,
  } = useAppContext();
  // navigate
  const navigate = useNavigate();

  // toggle form
  const toggleForm = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // handleChange
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();

      return;
    }

    // console.log(values);

    const currentUser = { name, email, password };

    if (isMember) {
      // console.log("Already a member");
      // loginUser(currentUser);
      setupUser({
        currentUser,
        endPoint: `login`,
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      // registerUser(currentUser);
      setupUser({
        currentUser,
        endPoint: `register`,
        alertText: "User Created! Redirecting...",
      });
    }
  };

  // navigate to dashboard page
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <>
      <div className="full-page">
        <form onSubmit={onSubmit}>
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}

          {/* name input  */}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}

          {/* email input  */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />

          {/* password input  */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />

          <button type="submit" disabled={isLoading}>
            Submit
          </button>

          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" className="member-btn" onClick={toggleForm}>
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>

          <br />
        </form>
      </div>
    </>
  );
};

export default Register;
