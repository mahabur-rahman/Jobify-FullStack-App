import React, { useState } from "react";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext";
import Alert from "../../components/Alert";

const Profile = () => {
  const { user, updateUser, displayAlert, isLoading, showAlert } =
    useAppContext();

  // input state
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // for testing 👍

    // if (!name || !email || !lastName || !location) {
    //   displayAlert();
    //   return;
    // }

    // invoke update user func
    updateUser({ name, email, lastName, location });
  };

  return (
    <>
      <h1> Profile</h1>

      {showAlert && <Alert />}

      <form onSubmit={handleSubmit}>
        <FormRow
          type="text"
          name="name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />

        <FormRow
          type="text"
          name="lastName"
          value={lastName}
          labelText="Last Name"
          handleChange={(e) => setLastName(e.target.value)}
        />

        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />

        <FormRow
          type="text"
          name="location"
          value={location}
          handleChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">
          {isLoading ? "Please wait.." : "Save changes"}
        </button>
      </form>
    </>
  );
};

export default Profile;
