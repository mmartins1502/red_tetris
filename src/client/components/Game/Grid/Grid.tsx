import React from "react";
import { Board } from "../../../../Shared/models/Board";

const pieces = [
  {
      color: "cyan",
  },
  {
      color: "blue",
  },
  {
      color: "orange",
  },
  {    
      color: "yellow",
  },
  {
      color: "green",
  },
  {
      color: "red",
  },
  {
      color: "purple",
  }
]




const classes = require("./Grid.module.css");

interface iProps {
  board: Board
}

const Grid = (props: iProps) => {

  

  return (
    <div className={classes.Grid}>
      {props.board.tmpGrid.map((rows, y) => {
        return <div key={y} className={classes.Line} >{rows.map((value, x) => {
          return <div key={x} className={classes.Case} style={value ? {backgroundColor: pieces[value -1].color, border: "solid black 0.5px"} : null}></div>
        })}</div>;
      })}
    </div>
  );
};

export default Grid;
