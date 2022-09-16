import { FaHotel } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import "./login.scss";
import axios from "../../axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    password: undefined,
  });
  const [showPassord, setShowPassword] = useState(false);
  const { dispatch, loading, error, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", userInfo);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="rev_login">
      <div className="l_left"></div>
      <div className="l_right">
        <div className="l_logo_wrapper">
          <Link to="/" className="logo">
            <FaHotel className="icon" />
            <span>Reserve</span>
          </Link>
        </div>
        <div className="l_form">
          <h1>Login</h1>
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
                  name="password"
                  label="Password"
                  type={showPassord ? "text" : "password"}
                  id="password"
                  autoComplete="password"
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
            </Grid>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              className="l_btn"
            >
              Login
            </Button>
            {error && <p className="errMsg">{error.message}</p>}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Login;
