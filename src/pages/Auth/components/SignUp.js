import React, { useContext } from "react";
import { AuthContext } from "../auth-context";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import NavBar from "../../components/Navbar";
import ReCaptchaV2 from "react-google-recaptcha";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});
const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    marginTop: theme.spacing(0),
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
const SignUp = ({ handleChange }) => {
  const [error, setError] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const recaptchaRef = React.useRef();
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let history = useHistory();
  const classes = useStyles();
  const authSubmitHandler = async (event) => {
    console.log(event);
    try {
      const responseData = await axios.post(
        `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/signup`,
        {
          email: event.email,
          password: event.password,
          username: event.username,
          pass:"1234abcd",
          isAdmin: event.isAdmin,
          warehouse:
            event.warehouse.length > 0
              ? event.warehouse.split(",").map(Number)
              : [],
          state: event.state.length > 0 ? event.state.split(",") : [],
        }
      );
      responseData && alert("Successfully Created the User");
      history.push("/users");
    } catch (error) {
      error.response.status === 422 && setError(true);
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
    <>
      <NavBar />
      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          {error && <p style={{ color: "red" }}>User Already Exists!</p>}
          <Typography
            style={{ marginBottom: "4%" }}
            component="h1"
            variant="h5"
          >
            Sign Up
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(authSubmitHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="username"
                  {...register("username")}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="admin-label">Is Admin</InputLabel>
                  <Select
                    labelId="admin-label"
                    id="main-admin-select"
                    label="Is Admin"
                    defaultValue={false}
                    {...register("isAdmin")}
                  >
                    <MenuItem value={true}>true</MenuItem>
                    <MenuItem value={false}>false</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              variant="outlined"
              margin="normal"
              {...register("email")}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              {...register("state")}
              fullWidth
              id="state"
              label="State"
              name="state"
              autoComplete="state"
            />
            <TextField
              variant="outlined"
              margin="normal"
              {...register("warehouse")}
              fullWidth
              id="warehouse"
              label="Warehouse"
              name="warehouse"
              autoComplete="warehouse"
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
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              {...register("confirmPassword")}
              type="password"
              required
              fullWidth
              name="confirmPassword"
              label="confirm password"
              id="confirmPassword"
              autoComplete="current-password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
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
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
export default SignUp;
