import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { useStyles } from "./Signup";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import Hidden from "@material-ui/core/Hidden";

const Login = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width: 992px)`);
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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

      <Grid item container xs={12} sm={7} direction="column">
        <Grid item container alignItems="center" className={classes.formNav}>
          <Grid item xs={false} sm={2}></Grid>
          <Grid item xs={6} sm={5} className={classes.formNavText}>
            <Typography variant={isMobile ? null : "h6"}>
              Don't have an account?
            </Typography>
          </Grid>
          <Grid item container xs={6} sm={5} justifyContent="center">
            <Button
              classes={{ root: classes.loginBtn }}
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </Grid>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid item className={classes.formContent}>
            <Typography variant="h4" className={classes.formHeading}>
              Welcome back!
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
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
                className={classes.textField}
              />
            </FormControl>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                classes={{ root: classes.createBtn }}
              >
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
