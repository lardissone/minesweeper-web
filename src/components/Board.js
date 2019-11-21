import React from "react";
import Cell from "./Cell";
import "../styles/Board.css";

const Board = props => {
  const { game, finished } = props;

  const pivotCells = cells => {
    const obj = [...Array(game.rows)].map(e => Array(game.cols));
    for (const cell of cells) {
      obj[cell.row][cell.column] = cell;
    }
    return obj;
  };
  const cellsArr = pivotCells(game.cells);

  const renderCells = cells => {
    const toReturn = [];
    for (let row = 0; row < game.rows; row++) {
      const colCells = [];
      for (let col = 0; col < game.cols; col++) {
        colCells.push(
          <Cell
            key={`${game.id}_${row}_${col}`}
            cell={cells[row][col]}
            sendMove={props.sendMove}
            finished={finished}
          />
        );
      }
      toReturn.push(<tr key={`row_${row}`}>{colCells}</tr>);
    }
    return toReturn;
  };

  return (
    <React.Fragment>
      <h1 className="is-size-3">{game.name}</h1>
      {game.state === 3 && (
        <article className="message is-success">
          <div className="message-body">
            <span className="has-text-weight-bold">Congratulations!</span> You
            just beat this level.
          </div>
        </article>
      )}
      {game.state === 4 && (
        <article className="message is-danger">
          <div className="message-body">
            <span className="has-text-weight-bold">Bummer!</span> You just
            exploded!
          </div>
        </article>
      )}
      <table className="board">
        <tbody>{renderCells(cellsArr)}</tbody>
      </table>
    </React.Fragment>
  );
};

export default Board;
