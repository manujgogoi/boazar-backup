import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Notifications from "./pages/notifications/Notifications";
import BecomeVendor from "./pages/becomeVendor/BecomeVendor";
import Products from "./pages/products/Products";
import NotFound from "./pages/notFound/NotFound";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import { connect } from "react-redux";
import * as authActions from "./store/actions/authActions";

const App = (props) => {
  // Check user access on app load
  props.authCheck();
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute exact path="/" restricted={false} Component={Home} />
          <PublicRoute
            exact
            path="/login"
            restricted={true}
            Component={Login}
          />
          <PublicRoute
            exact
            path="/register"
            restricted={true}
            Component={Register}
          />
          <PrivateRoute path="/become_vendor" Component={BecomeVendor} />
          <PrivateRoute path="/dashboard" Component={Dashboard} />
          <PrivateRoute path="/notifications" Component={Notifications} />
          <PrivateRoute path="/products" Component={Products} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

// Redux

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authActions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
