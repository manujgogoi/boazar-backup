import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utils";

const initialState = {
  isLoading: false,
  error: null,
  vendor: null,
};

const vendorStart = (state, action) => {
  return updateObject(state, {
    isLoading: true,
  });
};

const vendorSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: null,
    vendor: action.vendor,
  });
};

const vendorFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error,
    vendor: null,
  });
};

const VendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VENDOR_START:
      return vendorStart(state, action);
    case actionTypes.VENDOR_SUCCESS:
      return vendorSuccess(state, action);
    case actionTypes.VENDOR_FAIL:
      return vendorFail(state, action);
    default:
      return state;
  }
};

export default VendorReducer;
