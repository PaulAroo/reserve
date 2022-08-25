import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { AuthContext } from "../../context/auth-context";
import "./login.scss";

function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: undefined,
    password: undefined,
  });
  const [revealPassword, setRevealPassword] = useState(false);
  const { dispatch, loading, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", userDetails);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const togglePassordInputType = () => {
    setRevealPassword((prev) => !prev);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          UserName
          <input type="text" id="username" onChange={handleChange} />
        </label>
        <label htmlFor="password">
          Password
          <div className="pass">
            <input
              type={revealPassword ? "text" : "password"}
              id="password"
              onChange={handleChange}
            />
            <span onClick={togglePassordInputType}>
              {revealPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
        </label>
        <button disabled={loading}>Login</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default Login;
