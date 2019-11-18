import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "bulma/css/bulma.css";

import { AuthContext, reducer } from "./state/Auth";

import Nav from "./components/Nav";
import Login from "./components/Login";
import GameList from "./components/GameList";
import Game from "./components/Game";

export const GamesContext = React.createContext();
export const GameContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  token: null
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          access: token
        }
      });
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Router>
        <Nav />
        <section className="section App">
          <div className="container">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/game/:id">
                <Game />
              </PrivateRoute>
              <PrivateRoute exact path="/">
                <GameList />
              </PrivateRoute>
            </Switch>
          </div>
        </section>
      </Router>
    </AuthContext.Provider>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default App;
