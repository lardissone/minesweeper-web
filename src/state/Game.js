import React from "react";

export const GameContext = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_GAME_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_GAME_SUCCESS":
      return {
        ...state,
        isFetching: false,
        game: action.payload
      };
    case "FETCH_GAME_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case "PLAY_GAME_REQUEST":
      return {
        ...state,
        isSubmitting: true,
        hasPlayError: false
      };
    case "PLAY_GAME_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        game: action.payload
      };
    case "PLAY_GAME_FAILURE":
      return {
        ...state,
        hasPlayError: true,
        isSubmitting: false
      };
    default:
      return state;
  }
};
