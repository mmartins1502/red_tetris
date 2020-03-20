import { Piece } from './Piece';

export class Board {
  grid: Array<Array<number>>;
  tmpGrid: Array<Array<number>>;
  currentPiece?: Piece;

  constructor(grid = Array.from({length: 20}, () => Array(10).fill(0)), tmpGrid = Array.from({length: 20}, () => Array(10).fill(0))) {
    this.grid = grid
    this.tmpGrid = tmpGrid

  }

// Reset the board when we start a new game.
// reset() {
//   this.grid = this.getEmptyBoard();
// }

// // Get matrix filled with zeros.
// private getEmptyBoard() {
//   return Array.from(
//     {length: 20}, () => Array(10).fill(0)
//   );
// }

public current() {
  try {
      let posX = 0 
      let posY = 0
      this.tmpGrid = this.grid.map((rows, y) => {
        rows = rows.map((value, x) => {
          if (this.currentPiece && posX < this.currentPiece.width && posY < this.currentPiece.height) {
            if (y >= this.currentPiece.pos.y && x >= this.currentPiece.pos.x) {
                value = this.currentPiece.shape[posY][posX]
                posX++ 
              }
          }
          return value
        })
        if (this.currentPiece && posY < this.currentPiece.height && y >= this.currentPiece.pos.y){
          posY++
          posX = 0 
        }
        return rows
      })
  } catch (e) {
    console.error(e)
  }
}

}

// export default Board;
