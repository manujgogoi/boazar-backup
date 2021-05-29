import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ Component, isLogin, ...rest }) => {
  return (
    // Redirect the user to /login page
    <Route
      {...rest}
      render={(props) => {
        return isLogin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
// redux
const mapStateToProps = (state) => {
  return {
    isLogin: state.AuthReducer.userToken !== null,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
