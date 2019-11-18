import React from "react";
import { AuthContext } from "../state/Auth";

const Nav = () => {
  const { state, dispatch } = React.useContext(AuthContext);

  const logout = () => {
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
        <a href="/" className="navbar-item">
          <strong>Minesweeper</strong>
        </a>
        <a href="/games" className="navbar-item">
          Games
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a
                href="/logout"
                className="button is-light"
                style={{ display: state.isAuthenticated ? "" : "none" }}
                onClick={logout}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
