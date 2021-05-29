import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utils";

const initialState = {
  userId: null,
  userToken: null,
  error: null,
  isLoading: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    isLoading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.id,
    userToken: action.token,
    error: null,
    isLoading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    isLoading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    userToken: null,
    userId: null,
    error: null,
    isLoading: false,
  });
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default AuthReducer;
