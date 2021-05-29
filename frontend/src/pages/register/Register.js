import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import Footer from "../../containers/Footer";
import { useFormik } from "formik";
import axios from "axios";
import * as server from "../../utils/serverInfo";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as registerActions from "../../store/actions/registerActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;

// Form Validation Schema using Yup plugin (with Formik)
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Minimum 3 characters required")
    .max(20, "Maximum 20 characters limit")
    .required("Required")
    .test(
      "Unique Username",
      "Username already in use. Try another",
      function (value) {
        return new Promise((resolve, reject) => {
          axios
            .post(`${server.SERVER_URL}/api/accounts/username_exists/`, {
              username: value,
            })
            .then((res) => {
              if (res.data.message === true) {
                resolve(false);
              }
              resolve(true);
            })
            .catch((err) => {
              resolve(true);
            });
        });
      }
    ),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string()
    .required("Password Required")
    .min(6, "Minimum 6 charaters"),
  confirmPassword: Yup.string()
    .required("Retype your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

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
    marginTop: theme.spacing(3),
  },
  formError: {
    color: "#ff0000",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginBottom: 10,
  },
  alertLink: {
    marginLeft: 10,
    color: "#fff",
  },
}));

// Component >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Register = (props) => {
  const classes = useStyles();

  // Form Submit Response alert State
  const [alertOpen, setAlertOpen] = React.useState(false);

  // Form handing third party component (Formik)
  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, actions) => {
      props.registerUser(values.username, values.phoneNumber, values.password);
      actions.resetForm();
      setAlertOpen(true);
    },
  });

  // Form Submit Success response Alert
  const ResponseAlert = () => {
    if (alertOpen) {
      return (
        <Alert
          onClose={() => {
            setAlertOpen(false);
          }}
          variant="filled"
          severity="success"
          className={classes.alert}
        >
          Account Created Successfully.
          <RouterLink to="/login" className={classes.alertLink}>
            Go to Login
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register New User
        </Typography>
        <FormHelperText className={classes.formError}>
          {props.error && props.error}
        </FormHelperText>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <FormHelperText className={classes.formError}>
                {formik.touched.username &&
                  formik.errors.username &&
                  formik.errors.username}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneNumber"
                label="phoneNumber"
                id="phoneNumber"
                autoComplete="phone-number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              <FormHelperText className={classes.formError}>
                {formik.touched.phoneNumber &&
                  formik.errors.phoneNumber &&
                  formik.errors.phoneNumber}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="password"
                name="password"
                type="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <FormHelperText className={classes.formError}>
                {formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <FormHelperText className={classes.formError}>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.registering}
          >
            Register
            {props.registering && (
              <CircularProgress size={20} className={classes.loadingIcon} />
            )}
          </Button>
          <ResponseAlert />
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
  );
};

// Redux
const mapStateToProps = (state) => {
  return {
    error: state.RegisterReducer.error,
    registering: state.RegisterReducer.registering,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (username, phoneNumber, password) =>
      dispatch(registerActions.registerUser(username, phoneNumber, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
