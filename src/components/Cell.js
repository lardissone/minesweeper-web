import React from "react";

const Cell = props => {
  const { cell, finished, sendMove } = props;
  let cn = "clean";
  switch (cell.state) {
    case 1:
      cn = "question";
      break;
    case 2:
      cn = "flag";
      break;
    default:
      break;
  }

  if (cell.uncovered) {
    cn = "uncovered";
  }
  if (finished && cell.mine) {
    cn = "mine";
  }

  cn += ` cell-color${cell.value}`;

  let cellContent = cell.value > 0 && cell.uncovered ? cell.value : "";

  const handleCellClick = () => {
    let action = "reveal";

    if (cell.state === 2) {
      return;
    }

    sendMove(cell, action);
  };

  const handleCellRightClick = e => {
    e.preventDefault();
    sendMove(cell, "flag");
  };

  return (
    <td
      className={cn}
      onClick={handleCellClick}
      onContextMenu={handleCellRightClick}
    >
      <span className="has-text-weight-bold is-size-6 has-text-centered">
        {cellContent}
      </span>
    </td>
  );
};

export default Cell;
