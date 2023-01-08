import React from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  // handleJobInput
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log(`${name}: ${value}`);

    handleChange({ name, value });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();

      return;
    }

    if (isEditing) {
      editJob();

      return;
    }

    createJob();

    // console.log("create job");
  };

  return (
    <>
      <form>
        <h2> {isLoading ? "edit job" : "add job"}</h2>
        {showAlert && <Alert />}

        {/* position  */}
        <FormRow
          type="text"
          name="position"
          value={position}
          handleChange={handleJobInput}
        />

        {/* company */}
        <FormRow
          type="text"
          name="company"
          value={company}
          handleChange={handleJobInput}
        />

        {/* location */}
        <FormRow
          type="text"
          labelText="job location"
          name="jobLocation"
          value={jobLocation}
          handleChange={handleJobInput}
        />

        {/* job status */}
        <FormRowSelect
          name="status"
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
        />

        {/* job type  */}
        <FormRowSelect
          name="jobType"
          labelText="job type"
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
        />

        {/* btn */}
        <div className="btn_container">
          <button type="submit" onClick={handleSubmit} disabled={isLoading}>
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();

              clearValues();
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default AddJob;
