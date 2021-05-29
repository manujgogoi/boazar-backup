import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import * as authActions from "../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#fff",
    textDecoration: "none",
  },
}));

const HeaderMenu = (props) => {
  const classes = useStyles();

  const handleLogout = () => {
    props.logout();
  };

  return (
    <div>
      <Link to="/dashboard" className={classes.link}>
        <IconButton edge="start" color="inherit">
          <DashboardIcon />
        </IconButton>
      </Link>
      <Link to="/notifications" className={classes.link}>
        <IconButton edge="start" color="inherit">
          <Badge badgeContent={5} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Link>
      <Link to="#" onClick={handleLogout} className={classes.link}>
        <IconButton edge="start" color="inherit">
          <ExitToAppIcon />
        </IconButton>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logoutByUser()),
  };
};

export default connect(null, mapDispatchToProps)(HeaderMenu);
