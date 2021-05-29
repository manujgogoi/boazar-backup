import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as server from "../../utils/serverInfo";

export const registerUserRequest = () => {
  return {
    type: actionTypes.REGISTER_USER_REQUEST,
  };
};

export const registerUserSuccess = () => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
  };
};

export const registerUserFail = () => {
  return {
    type: actionTypes.REGISTER_USER_FAIL,
  };
};

export const registerUser = (username, phoneNumber, password) => {
  return (dispatch) => {
    dispatch(registerUserRequest());

    // Register user backend API Call
    axios
      .post(`${server.SERVER_URL}/api/accounts/register/`, {
        username: username,
        phone_number: phoneNumber,
        password: password,
      })
      .then((res) => {
        dispatch(registerUserSuccess());
        console.log("User created successfully");
      })
      .catch((error) => {
        dispatch(registerUserFail(error));
        console.log("User creation failed: ", error);
      });
  };
};
