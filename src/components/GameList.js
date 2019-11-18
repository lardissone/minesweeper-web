import React from "react";
import config from "../config";
import constants from "../constants";
import { AuthContext } from "../state/Auth";
import { GamesContext, reducer } from "../state/Games";
import NewGameModal from "./NewGame";

const initialState = {
  games: [],
  isFetching: false,
  hasError: false,
  isGameSubmitting: false,
  gameHasError: false
};

const GameList = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isAddGameModalVisible, setAddGameModalVisibility] = React.useState(
    false
  );

  const toggleAddGame = () => {
    setAddGameModalVisibility(!isAddGameModalVisible);
  };

  React.useEffect(() => {
    dispatch({
      type: "FETCH_GAMES_REQUEST"
    });
    fetch(`${config.apiUrl}/api/games/`, {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        dispatch({
          type: "FETCH_GAMES_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        if (error.status === 401) {
          // dirty hack, should use router
          window.alert("Session expired, redirecting to login page");
          window.location.href = "/";
        }
        dispatch({
          type: "FETCH_GAMES_FAILURE"
        });
      });
  }, [authState.token]);

  return (
    <GamesContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <div className="container">
            <nav className="level">
              <div className="level-left">
                <h1 className="is-size-3">Game list</h1>
              </div>
              <div className="level-righ">
                <button className="button is-link" onClick={toggleAddGame}>
                  <span className="icon">
                    <i className="fas fa-gamepad"></i>
                  </span>
                  <span>New game</span>
                </button>
              </div>
            </nav>
            <NewGameModal
              onClose={toggleAddGame}
              show={isAddGameModalVisible}
            />

            <table className="table">
              <thead>
                <tr>
                  <th>Game Name</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {state.isFetching ? (
                  <tr colSpan="3">
                    <td className="has-text-centered">LOADING...</td>
                  </tr>
                ) : state.hasError ? (
                  <tr colSpan="3">
                    <td className="has-text-centered">
                      AN ERROR HAS OCCURED LOADING GAMES
                    </td>
                  </tr>
                ) : (
                  <>
                    {state.games.length > 0 &&
                      state.games.map(game => (
                        <tr key={`${game.id}_${game.name}`}>
                          <td>{game.name}</td>
                          <td>{constants.gameStates[game.state.toString()]}</td>
                          <td>
                            {[0, 1, 2].indexOf(game.state) > -1 && (
                              <button className="button is-info">
                                {game.state === 0 ? "Start" : "Resume"} game
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GamesContext.Provider>
  );
};

export default GameList;
