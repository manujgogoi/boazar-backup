import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utils";

const initialState = {
  registering: false,
  error: null,
};

const registrationStart = (state, action) => {
  return updateObject(state, {
    registering: true,
    error: null,
  });
};

const registrationFail = (state, action) => {
  return updateObject(state, {
    registering: false,
    error: action.error,
  });
};

const registrationSuccess = (state, action) => {
  return updateObject(state, {
    registering: false,
    error: null,
  });
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_REQUEST:
      return registrationStart(state, action);
    case actionTypes.REGISTER_USER_SUCCESS:
      return registrationSuccess(state, action);
    case actionTypes.REGISTER_USER_FAIL:
      return registrationFail(state, action);
    default:
      return state;
  }
};

export default RegisterReducer;
