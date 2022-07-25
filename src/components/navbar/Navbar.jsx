import React from "react";
import { FaHotel } from "react-icons/fa";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <span className="logo">
          <FaHotel className="icon" />
          Re<span>serve</span>
        </span>
        <div className="buttons">
          <button>Sign Up</button>
          <button className="login">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
