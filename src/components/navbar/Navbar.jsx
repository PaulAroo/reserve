import React, { useContext } from "react";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./navbar.scss";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="logo">
          <FaHotel className="icon" />
          Re<span>serve</span>
        </Link>
        {!user ? (
          <div className="buttons">
            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <div className="board">
            <span>{user.username}</span>
            <button onClick={() => dispatch({ type: "LOGOUT" })}>logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
