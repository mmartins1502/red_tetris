import React from "react";
import {Board} from "../../../../server/models/Board";

const classes = require("./Grid.module.css");

interface iProps {
  board: Board
}

const Grid = (props: iProps) => {
  const style = {
    backgroundColor: props.board.currentPiece ? props.board.currentPiece.color : "red"
  }

  return (
    <div className={classes.Grid}>
      {props.board.tmpGrid.map((rows, y) => {
        return <div key={y} className={classes.Line} >{rows.map((value, x) => {
          return <div key={x} className={classes.Case} style={value ? style : null}></div>
        })}</div>;
      })}
    </div>
  );
};

export default Grid;
