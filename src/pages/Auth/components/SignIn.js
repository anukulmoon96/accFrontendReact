import React, { useContext } from "react";
import { AuthContext } from "../auth-context";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import ReCaptchaV2 from "react-google-recaptcha";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().max(30, "Too Long!").required("Password is required"),
});
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(23),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    justifyContent: "center",
  },
}));

const SignIn = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const recaptchaRef = React.useRef();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let history = useHistory();
  const classes = useStyles();

  const authSubmitHandler = async (event) => {
    try {
      const responseData = await axios.post(
        `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/login`,
        {
          email: event.email,
          password: event.password,
        }
      );
      auth.login(responseData.data.userInfo, responseData.data.token);
      console.log(responseData.data.userInfo);
      history.push("/");
    } catch (error) {
      setError(true);
      handleExpire();
    }
  };

  const handleToken = (token) => {
    setToken(token);
  };

  const handleExpire = () => {
    recaptchaRef.current.reset();
    setToken(null);
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        {error && <p style={{ color: "red" }}>Invalid Credentials! </p>}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(authSubmitHandler)}
        >
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoFocus
                error={Boolean(errors.email) || error}
                helperText={errors.email?.message}
              />
            )}
            name="email"
            defaultValue=""
            control={control}
          />
          <TextField
            variant="outlined"
            margin="normal"
            {...register("password")}
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            error={Boolean(errors.password) || error}
            helperText={errors.password?.message}
          />
          <ReCaptchaV2
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={handleToken}
            onExpire={handleExpire}
            ref={recaptchaRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!token}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default SignIn;
