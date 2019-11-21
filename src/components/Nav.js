import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../state/Auth";

const Nav = () => {
  const { state, dispatch } = React.useContext(AuthContext);

  const logout = e => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT"
    });
  };

  return (
    <nav
      className="navbar is-warning"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <strong>Minesweeper</strong>
        </Link>
        {state.isAuthenticated && (
          <Link to="/" className="navbar-item">
            Games
          </Link>
        )}
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {state.isAuthenticated && (
                <a href="/logout" className="button is-light" onClick={logout}>
                  Logout
                </a>
              )}
              {!state.isAuthenticated && (
                <>
                  <Link to="/login" className="button is-light">
                    Login
                  </Link>
                  <Link to="/signup" className="button is-light">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
