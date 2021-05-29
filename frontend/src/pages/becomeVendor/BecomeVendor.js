import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import Footer from "../../containers/Footer";
import { useFormik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";
import * as vendorActions from "../../store/actions/vendorActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formError: {
    color: "#ff0000",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loadingIcon: {
    position: "absolute",
    color: "#0b9e26",
  },
}));

// Form validation shema using Yup with Formik
const VendorSchema = Yup.object().shape({
  vendorName: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters required")
    .max(30, "Maximum 30 characters limit"),
});

// Main Component >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const BecomeVendor = (props) => {
  const classes = useStyles();

  // Form Submit Response alert state
  const [alertOpen, setAlertOpen] = React.useState(false);

  // handle logout
  const handleLogout = () => {
    console.log("Logout");
  };

  const formik = useFormik({
    initialValues: { vendorName: "" },
    validationSchema: VendorSchema,
    onSubmit: (values, actions) => {
      props.register(values.vendorName);
      actions.resetForm();
      setAlertOpen(true);
    },
  });

  // Form submit success response Alert
  const ResponseAlert = () => {
    if (alertOpen) {
      return (
        <Alert>
          Vendor Created Successfully.
          <RouterLink to="/dashboard" className={classes.alertLink}>
            Go to dashboard
          </RouterLink>
        </Alert>
      );
    } else {
      return null;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <StorefrontIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          You are not a vendor
        </Typography>
        <FormHelperText className={classes.formError}>
          {props.error && props.error}
        </FormHelperText>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="vendorName"
            label="Vendor Name"
            name="vendorName"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vendorName}
          />
          <FormHelperText className={classes.formError}>
            {formik.touched.vendorName &&
              formik.errors.vendorName &&
              formik.errors.vendorName}
          </FormHelperText>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.isLoading}
          >
            Become vendor
            {props.isLoading && (
              <CircularProgress size={20} className={classes.loadingIcon} />
            )}
          </Button>
          <ResponseAlert />
          <Grid container>
            <Grid item xs>
              <Link href="#" onClick={handleLogout} variant="body2">
                Logout
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
};

// Redux
const mapStateToProps = (state) => {
  return {
    isLoading: state.VendorReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (vendorName) => dispatch(vendorActions.becomeVendor(vendorName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BecomeVendor);
