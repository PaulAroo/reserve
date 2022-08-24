import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./login.scss";

function Login() {
  const [userDetails, setUserDetails] = useState({
    username: undefined,
    password: undefined,
  });
  const [revealPassword, setRevealPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
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
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
