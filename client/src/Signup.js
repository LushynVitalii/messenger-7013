import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import bigImage from "./images/bg-img.png";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";

export const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Open Sans, sans-serif",
    letterSpacing: 0,
    width: "100%",
  },
  sideImg: {
    position: "relative",
    height: "100vh",
    width: "100%",
    backgroundImage: `linear-gradient(to bottom, rgba(134, 185, 255, 0.85), rgba(58, 141, 255, 0.85)), url(${bigImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    color: "hsl(100, 100%, 100%)",
  },
  smsIcon: {
    width: "5rem",
    height: "5rem",
    marginBottom: theme.spacing(6),
  },
  sideImgContent: {
    position: "absolute",
    width: "25rem",
    left: "50%",
    top: "45%",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
  },
  formContent: {
    width: "70%",
    margin: "12vh auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "3vh auto",
      padding: theme.spacing(3),
      textAlign: "center",
    },
  },
  textField: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
  },
  createBtn: {
    fontFamily: "Montserrat, sans-serif",
    background: "#3A8DFF",
    borderRadius: 3,
    border: 0,
    fontSize: "1.05rem",
    color: "white",
    height: "3.8rem",
    width: "11rem",
    padding: theme.spacing(0, 1.875),
    margin: theme.spacing(6),
    "&:hover": {
      background: "#076fff",
    },
    [theme.breakpoints.down("sm")]: {
      width: "9rem",
    },
  },
  loginBtn: {
    fontFamily: "Montserrat, sans-serif",
    background: "hsl(0, 0%, 100%)",
    borderRadius: 3,
    border: 0,
    fontSize: "1.05rem",
    color: "#3A8DFF",
    height: "3.8rem",
    width: "11rem",
    padding: theme.spacing(0, 1.875),
    boxShadow: "0 3px 5px 2px rgba(189, 195, 199, .4)",
    [theme.breakpoints.down("sm")]: {
      width: "8rem",
    },
  },
  formNav: {
    marginTop: theme.spacing(6),
    justifyContent: "center",
    color: "hsl(0, 0%, 60%)",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(5, 0, 3, 0),
    },
  },
  formHeading: {
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  formNavText: {
    textAlign: "end",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      fontSize: "1.2rem",
      padding: theme.spacing(0, 2),
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width: 992px)`);

  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      {/* Big Front Image */}
      <Hidden xsDown>
        <Grid item sm={5} className={classes.sideImg}>
          <Grid item sm={12} className={classes.sideImgContent}>
            <SmsOutlinedIcon className={classes.smsIcon} />
            <Typography variant="h4">
              Converse with anyone with any language
            </Typography>
          </Grid>
        </Grid>
      </Hidden>

      {/* Sign up form */}
      <Grid item container xs={12} sm={7} direction="column">
        <Grid item container alignItems="center" className={classes.formNav}>
          <Grid item xs={false} sm={2}></Grid>
          <Grid item xs={6} sm={5} className={classes.formNavText}>
            <Typography variant={isMobile ? null : "h6"}>
              Already have an account?
            </Typography>
          </Grid>
          <Grid item container xs={6} sm={5} justifyContent="center">
            <Button
              classes={{ root: classes.loginBtn }}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid item className={classes.formContent}>
            <Typography variant="h4" className={classes.formHeading}>
              Create an account
            </Typography>
            <FormControl fullWidth>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
                className={classes.textField}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
                className={classes.textField}
              />
            </FormControl>
            <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
                className={classes.textField}
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
                className={classes.textField}
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                classes={{ root: classes.createBtn }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
