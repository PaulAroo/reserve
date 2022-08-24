import React from "react";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link to="/" className="logo">
          <FaHotel className="icon" />
          Re<span>serve</span>
        </Link>
        <div className="buttons">
          <button>Sign Up</button>
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
