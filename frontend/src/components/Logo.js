import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import LogoWhiteNoBackground from "../assets/LogoWhiteNoBackground.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    [theme.breakpoints.down("sm")]: {
      width: 90,
    },
    [theme.breakpoints.up("md")]: {
      width: 120,
    },
    [theme.breakpoints.up("lg")]: {
      width: 200,
    },
  },
}));

const Logo = () => {
  const classes = useStyles();
  return (
    <img src={LogoWhiteNoBackground} className={classes.logo} alt="logo" />
  );
};

export default Logo;
