import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utils";

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

const userRequest = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    error: null,
  });
};

const userSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: null,
    user: action.user,
  });
};

const userFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error,
    user: null,
  });
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REQUEST:
      return userRequest(state, action);
    case actionTypes.USER_SUCCESS:
      return userSuccess(state, action);
    case actionTypes.USER_FAIL:
      return userFail(state, action);
    default:
      return state;
  }
};

export default UserReducer;
