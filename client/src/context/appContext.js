import { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  // REGISTER_USER_BEGIN,
  // REGISTER_USER_SUCCESS,
  // REGISTER_USER_ERROR,
  // LOGIN_USER_BEGIN,
  // LOGIN_USER_SUCCESS,
  // LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_BEGIN,
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
} from "./actions";
import axios from "axios";

// get item from localStorage 👍
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

// initialState
const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  // job
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  //   display alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });

    clearAlert();
  };

  // clear alert
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // localStorage
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  // remove user from localStorage
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  // register user || current user object
  // const registerUser = async (currentUser) => {
  //   // console.log(currentUser);
  //   dispatch({ type: REGISTER_USER_BEGIN });

  //   try {
  //     const res = await axios.post("/api/v1/auth/register", currentUser);
  //     // console.log(res);

  //     const { user, token, location } = res.data;
  //     dispatch({
  //       type: REGISTER_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });

  //     // localStorage func invoke 👍

  //     addUserToLocalStorage({ user, token, location });
  //   } catch (err) {
  //     // console.log(err.res);
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: { msg: err.res.data.msg },
  //     });
  //   }

  //   // hide alert
  //   clearAlert();
  // };

  // // login user
  // const loginUser = async (currentUser) => {
  //   // console.log(currentUser);
  //   dispatch({ type: LOGIN_USER_BEGIN });

  //   try {
  //     const { data } = await axios.post("/api/v1/auth/login", currentUser);
  //     const { user, token, location } = data;

  //     dispatch({
  //       type: LOGIN_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });

  //     addUserToLocalStorage({ user, token, location });
  //   } catch (err) {
  //     dispatch({
  //       type: LOGIN_USER_ERROR,
  //       payload: { msg: err.res.data.msg },
  //     });
  //   }

  //   clearAlert();
  // };

  // REGISTER && LOGIN USER BOTH OF THEM USING ONE FUNC

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    // console.log(currentUser);
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (err) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.res.data.msg },
      });
    }

    clearAlert();
  };

  // LOGOUT USER
  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });

    removeUserFromLocalStorage();
  };

  // UPDATE USER 👍
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      console.log("update user: ", data);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });
    } catch (err) {
      if (err.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: err.response.data.msg },
        });
      }
      console.log(err.response);
    }

    clearAlert();
  };

  // handleChange
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });

    console.log(name, value);
  };

  // clear values
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // create job
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });

      dispatch({ type: CLEAR_VALUES });
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }

    clearAlert();
  };

  // get all jobs 👍
  const getAllJobs = async () => {
    const url = "/jobs";

    dispatch({
      type: GET_JOB_BEGIN,
    });

    try {
      const { data } = await authFetch(url); // it should be same like ---- authFetch.get(url)
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOB_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (err) {
      console.log(err.response);
    }

    clearAlert();
  };

  // Edit job
  const setEditJob = (id) => {
    console.log(`edit job : ${id}`);
  };

  // delete job
  const deleteJob = (id) => {
    console.log(`delete job : ${id}`);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        deleteJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, initialState, useAppContext };
