import React from "react";

export const GamesContext = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_GAMES_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_GAMES_SUCCESS":
      return {
        ...state,
        isFetching: false,
        games: action.payload
      };
    case "FETCH_GAMES_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case "NEW_GAME_REQUEST":
      return {
        ...state,
        isGameSubmitting: true,
        gameHasError: false
      };
    case "NEW_GAME_SUCCESS":
      return {
        ...state,
        isGameSubmitting: false,
        games: [...state.games, action.payload]
      };
    case "NEW_GAME_FAILURE":
      return {
        ...state,
        isGameSubmitting: false,
        gameHasError: true
      };
    default:
      return state;
  }
};
