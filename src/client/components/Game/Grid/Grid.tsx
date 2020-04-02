import React from "react";
import { Board } from "../../../../Shared/models/Board";
import "./Grid.css"

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




// const classes = require("./Grid.module.css");

interface iProps {
  board: Board
}

const Grid = (props: iProps) => {

  

  return (
    <div className={"Grid"}>
      {props.board.tmpGrid.map((rows, y) => {
        return <div key={y} className={"Line"} >{rows.map((value, x) => {
          return <div key={x} className={value === -1 ? "Case Indextructible" : value > 0 ? "Case Tetri" : "Case"} style={value > 0 ? {backgroundColor: pieces[value -1].color} : null}></div>
        })}</div>;
      })}
    </div>
  );
};

export default Grid;
