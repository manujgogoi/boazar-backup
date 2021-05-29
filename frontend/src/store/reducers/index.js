import { combineReducers } from "redux";
import AuthReducer from "./auth";
import VendorReducer from "./vendor";
import RegisterReducer from "./register";
import UserReducer from "./user";

const rootReducer = combineReducers({
  AuthReducer,
  VendorReducer,
  RegisterReducer,
  UserReducer,
});

export default rootReducer;
