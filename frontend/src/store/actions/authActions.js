import axios from "axios";
import Cookies from "js-cookie";
import * as actionTypes from "./actionTypes";
import * as server from "../../utils/serverInfo";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    id: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  Cookies.remove("token");
  Cookies.remove("id");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());

    // Login backend API Call

    axios
      .post(`${server.SERVER_URL}/api/accounts/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const oneDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        Cookies.set("token", res.data.token, { expires: oneDay });
        Cookies.set("id", res.data.user.id, { expires: oneDay });
        dispatch(authSuccess(res.data.token, res.data.user.id));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.message[0]));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    if (token === undefined || id === undefined) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token, id));
    }
  };
};

export const logoutByUser = () => {
  return (dispatch) => {
    const token = Cookies.get("token");

    axios
      .post(
        `${server.SERVER_URL}/api/accounts/logout/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        dispatch(authLogout());
      })
      .catch((error) => {
        console.log("Logout error: ", error);
      });
  };
};
