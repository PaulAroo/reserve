import React, { useContext, useState } from "react";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./navbar.scss";

function Navbar({ fillNav, colorFill }) {
  const { user, dispatch } = useContext(AuthContext);
  const [fill, setFill] = useState(!!fillNav);

  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    window.scrollY > 150 ? setFill(true) : setFill(false);
  }

  return (
    <nav
      className={`navbar${fill ? " navbar_fill" : ""}${
        colorFill ? " nav-bg-fill" : ""
      }`}
    >
      <div className="navbar__container">
        <Link to="/" className="logo">
          <FaHotel className="icon" />
          <span>Re</span>serve
        </Link>
        <div className="buttons">
          {!user ? (
            <>
              <Link to="/sign-up">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </>
          ) : (
            <>
              <span>{user.username}</span>
              <button onClick={() => dispatch({ type: "LOGOUT" })}>
                logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
