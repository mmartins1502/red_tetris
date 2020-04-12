import React from "react";
import { Board } from "../../../../Shared/models/Board";
import "./Grid.css"
import { pieces, iPieces } from "../../../../Shared/models/Pieces";

interface iProps {
  board: Board
}

const Grid = (props: iProps) => {

  const whichClass = (value: number) => {
    const classCss = pieces.find((piece: iPieces) => value === piece.value)
    return classCss ? classCss.name : ""
  }
  

  return (
    <div>
      <div className={"Grid"}>
        {props.board.tmpGrid.map((rows, y) => {
          return <div key={y} className={"Line"} >{rows.map((value, x) => {
            let classCss = whichClass(value)
            return <div key={x} className={value === -1 ? "Case Indextructible" : value > 0 ? "Case Tetri " + classCss : "Case"} ></div>
          })}</div>;
        })}
      </div>
      <div className="Commands">
        <h4>Commands</h4>
        <span className="CommandsList">← : move left</span>
        <span className="CommandsList">→ : move right</span>
        <span className="CommandsList">↑ : rotate piece</span>
        <span className="CommandsList">↓ : move down</span>
        <span className="CommandsList">space : drop piece</span>
      </div>
    </div>
  );
};

export default Grid;
