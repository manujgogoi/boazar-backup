import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({ Component, isLogin, restricted, ...rest }) => {
  return (
    // restricted = true means restricted route
    <Route
      {...rest}
      render={(props) => {
        return isLogin && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        );
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

export default connect(mapStateToProps)(PublicRoute);
