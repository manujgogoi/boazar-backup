import axios from "axios";
import Cookies from "js-cookie";
import * as actionTypes from "./actionTypes";
import * as server from "../../utils/serverInfo";

export const vendorStart = () => {
  return {
    type: actionTypes.VENDOR_START,
  };
};

export const vendorSuccess = (vendor) => {
  return {
    type: actionTypes.VENDOR_SUCCESS,
    vendor: vendor,
  };
};

export const vendorFail = (error) => {
  return {
    type: actionTypes.VENDOR_FAIL,
    error: error,
  };
};

export const updateVendorState = () => {
  return (dispatch) => {
    dispatch(vendorStart());
    const id = Cookies.get("id");
    const token = Cookies.get("token");
    if (id === undefined) {
      dispatch(vendorFail("No user found"));
    } else {
      // Api call (check if user is a vendor. )
      axios
        .post(
          `${server.SERVER_URL}/api/vendors/vendor_detail`,
          { id: id },
          { headers: { Authorization: `Token ${token}` } }
        )
        .then((res) => {
          dispatch(vendorSuccess(res.data.vendor));
        })
        .catch((error) => {
          dispatch(vendorFail(error));
        });
    }
  };
};

export const becomeVendor = (vendorName) => {
  return (dispatch) => {
    dispatch(vendorStart());
    const id = Cookies.get("id");
    const token = Cookies.get("token");
    if (id === undefined) {
      dispatch(vendorFail("No user found"));
    } else {
      // Api call (register a new vendor)
      axios
        .post(
          `${server.SERVER_URL}/api/vendors/become_vendor`,
          { userId: id, vendorName: vendorName },
          { headers: { Authorization: `Token ${token}` } }
        )
        .then((res) => {
          dispatch(vendorSuccess(res.data));
        })
        .catch((error) => {
          dispatch(vendorFail(error));
        });
    }
  };
};
