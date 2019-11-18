import React from "react";
import "bulma/css/bulma.css";

import { AuthContext, reducer } from "./state/Auth";

import Nav from "./components/Nav";
import Login from "./components/Login";
import Game from "./components/Game";
import GameList from "./components/GameList";

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
          token
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Nav />
      <section className="section App">
        <div className="container">
          {!state.isAuthenticated ? <Login /> : <GameList />}
        </div>
      </section>
    </AuthContext.Provider>
  );
}

export default App;
