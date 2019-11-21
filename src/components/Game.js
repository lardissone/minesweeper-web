import React from "react";
import { useParams, useHistory } from "react-router-dom";
import config from "../config";
import { GameContext, reducer } from "../state/Game";

import Board from "./Board";

const initialState = {
  game: null,
  isFetching: false,
  hasError: false,
  isSubmitting: false,
  hasPlayError: false
};

const Game = props => {
  const { id } = useParams();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const history = useHistory();

  React.useEffect(() => {
    dispatch({
      type: "FETCH_GAME_REQUEST"
    });
    fetch(`${config.apiUrl}/api/games/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
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
          type: "FETCH_GAME_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        dispatch({
          type: "FETCH_GAME_FAILURE"
        });
        if (error.status === 401) {
          localStorage.removeItem("token");
          history.push("/login");
        }
      });
  }, [history, id]);

  const sendMove = (cell, action) => {
    sendRequest({
      action,
      row: cell.row,
      col: cell.column
    });
  };

  const sendRequest = data => {
    dispatch({
      type: "PLAY_GAME_REQUEST"
    });
    fetch(`${config.apiUrl}/api/games/${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`
      },
      body: JSON.stringify(data)
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
          type: "PLAY_GAME_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        dispatch({
          type: "PLAY_GAME_FAILURE"
        });
        if (error.status === 401) {
          localStorage.removeItem("token");
          history.push("/login");
        }
      });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div>Game id: {id}</div>
      {state.game ? (
        <Board
          game={state.game}
          sendMove={sendMove}
          finished={typeof state.game.finished === "string"}
        />
      ) : (
        <div>LOADING...</div>
      )}
    </GameContext.Provider>
  );
};

export default Game;
