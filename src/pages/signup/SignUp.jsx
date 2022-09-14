import "./signup.scss";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const [valid, setValid] = useState(false);
  const [showPassord, setShowPassword] = useState(false);
  const { dispatch, loading, error, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePasswordCheck = (e) => {
    if (e.target.value !== userInfo.password) setValid(true);
    else setValid(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", userInfo);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="rev_signUp">
      <div className="s_left"></div>
      <div className="s_right">
        <div className="s_logo_wrapper">
          <Link to="/" className="logo">
            <FaHotel className="icon" />
            Re<span>serve</span>
          </Link>
        </div>
        <div className="s_form">
          <h1>Sign Up</h1>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassord ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {!showPassord ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Confirm password"
                  type="password"
                  id="confirm-password"
                  error={valid}
                  helperText={valid && "password doesn't match"}
                  onChange={handlePasswordCheck}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              disabled={valid}
              sx={{ mt: 3, mb: 2, width: "50%" }}
            >
              Sign Up
            </Button>
            {error && <p className="errMsg">{error.message}</p>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Log in</Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
