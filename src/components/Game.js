import React from "react";
import { useParams } from "react-router-dom";

const Game = props => {
  const { id } = useParams();

  return <div>Game id: {id}</div>;
};

export default Game;
