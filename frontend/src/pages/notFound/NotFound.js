import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "radial-gradient(circle, rgba(150,9,145,1) 0%, rgba(128,8,123,1) 15%, rgba(79,2,76,1) 100%)",
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "yellow",
    minHeight: 180,
    padding: 10,
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h1" component="p">
              404
            </Typography>
            <Typography variant="h5" component="p">
              Page not found
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" component="p">
              Go to Home
            </Typography>
            <Typography variant="h4" component="p">
              Go to Dashboard
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default NotFound;
