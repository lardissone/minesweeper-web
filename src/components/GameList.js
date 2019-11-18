import React from "react";
import { AuthContext } from "../state/Auth";

const GameList = () => {
  const { state } = React.useContext(AuthContext);

  return <div>hola</div>;
};

export default GameList;
