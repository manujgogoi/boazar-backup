import axios from "axios";
import Cookies from "js-cookie";
import * as actionTypes from "./actionTypes";
import * as server from "../../utils/serverInfo";

export const userRequest = () => {
  return {
    type: actionTypes.USER_REQUEST,
  };
};

export const userSuccess = (user) => {
  return {
    type: actionTypes.USER_SUCCESS,
    user: user,
  };
};

export const userFail = () => {
  return {
    type: actionTypes.USER_FAIL,
  };
};

export const updateUserState = () => {
  return (dispatch) => {
    dispatch(userRequest());
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    if (token === undefined || id === undefined) {
      dispatch(userFail("User not found"));
    } else {
      axios
        .post(
          `${server.SERVER_URL}/api/accounts/user/`,
          { id: id },
          { headers: { Authorization: `Token ${token}` } }
        )
        .then((res) => {
          dispatch(userSuccess(res.data));
        })
        .catch((error) => {
          dispatch(userFail(error));
        });
    }
  };
};
