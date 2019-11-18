import React from "react";

export const AuthContext = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.access);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.access
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
