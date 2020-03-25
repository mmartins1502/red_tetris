import { Piece } from './Piece';
// import { pieces } from './Pieces';

// const initialGrid = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]

export class Board {
  grid: Array<Array<number>>;
  tmpGrid: Array<Array<number>>;
  currentPiece: Piece;
  gameOver: boolean


  constructor(letter: string) {
    this.grid = Array.from({length: 20}, () => Array(10).fill(0))//initialGrid
    this.tmpGrid = this.grid //Array.from({length: 20}, () => Array(10).fill(0))
    this.currentPiece = new Piece(letter)
    this.gameOver =false
  }

  // public reset() {
  //   this.grid = Array.from({length: 20}, () => Array(10).fill(0))
  //   this.tmpGrid = this.grid
  // }


  private insideWalls(x: number) {
    console.log('x', x)
    console.log('insideWalls', x >= 0 && x < 10)
    return x >= 0 && x < 10;
  }

  private isEmpty(value: number) {
    console.log('isEmpty', value)
    return value === 0;
  }

  private aboveFloor(y: number) {
    console.log('aboveFloor', y >= 0 && y < 20)
    return y >= 0 && y < 20;
  }

  private notOccupied(x: number, y: number) {
    console.log('notOccupied', this.grid[y] && this.grid[y][x] === 0)
    return this.grid[y] && this.grid[y][x] === 0;
  }


  public isValid(piece: Piece) {
    console.log('piece.shape', piece.shape)
      return piece.shape.every((row, dy) => {
        return row.every((value, dx) => {
          let x = piece.pos.x + dx
          let y = piece.pos.y + dy
          return (
            this.isEmpty(value) ||
            (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
          );
        })
      })
  }

  public move(p: Piece){
    if (this.currentPiece) {
        this.currentPiece.pos.x = p.pos.x
        this.currentPiece.pos.y = p.pos.y
      }
  }

  public draw() {
    const piece = this.currentPiece
    console.log('piece', piece)
    this.tmpGrid = this.grid.map((row, y) => {
      return row.map((value, x) => {
        if (x >= piece.pos.x && y >= piece.pos.y && (x - piece.pos.x) <= piece.width && (y - piece.pos.y) <= piece.height) {
          value = value ? value : piece.shape[y - piece.pos.y][x - piece.pos.x]
        }
        return value
      })
    })
  }
  
  public clearLines() {
    this.grid.forEach((row, y) => {
      // If every value is greater than 0.
      if (row.every(value => value > 0)) {
        // Remove the row.
        this.grid.splice(y, 1);
        // Add zero filled row at the top. 
        this.grid.unshift(Array(10).fill(0));
      } 
    });
  }


  public freeze() {
    this.currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.currentPiece.pos.y][x + this.currentPiece.pos.x] = value;
        }
      });
    });
    this.clearLines()
  }

}
