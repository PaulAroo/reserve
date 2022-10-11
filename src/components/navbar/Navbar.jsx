import React, { useContext, useState } from "react";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./navbar.scss";

function Navbar({ fillNav }) {
  const { user, dispatch } = useContext(AuthContext);
  const [fill, setFill] = useState(!!fillNav);

  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    window.scrollY > 150 ? setFill(true) : setFill(false);
  }

  return (
    <nav className={`navbar ${fill ? "navbar_fill" : ""}`}>
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
