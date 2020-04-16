import { Piece, iPiece } from './Piece';
import  {POINTS}  from '../../server/game/game';


export interface iScore {
  points: number;
  lines: number;
}

export interface iBoard {
  grid: number[][];
  tmpGrid: number[][];
  currentPiece: iPiece;
  gameOver: boolean;
  insideWalls: (x: number) => boolean
  isEmpty: (value: number) => boolean
  aboveFloor: (y: number) => boolean
  notOccupied: (x: number, y: number) => boolean
  isValid: (piece: iPiece) => boolean
  move: (p: iPiece) => void
  draw: () => void
  getLineClearPoints: (lines: number) => number
  clearLines: () => iScore
  freeze: () => iScore
  clearLinesForLife: () => void
}

export class Board {
  grid: number[][];
  tmpGrid: number[][];
  currentPiece: iPiece;
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


  public insideWalls(x: number) {
    // console.log('x', x)
    // console.log('insideWalls', x >= 0 && x < 10)
    return x >= 0 && x < 10;
  }

  public isEmpty(value: number) {
    // console.log('isEmpty', value)
    return value === 0;
  }

  public aboveFloor(y: number) {
    // console.log('aboveFloor', y >= 0 && y < 20)
    return y >= 0 && y < 20;
  }

  public notOccupied(x: number, y: number) {
    // console.log('notOccupied', this.grid[y] && this.grid[y][x] === 0)
    return this.grid[y] && this.grid[y][x] === 0;
  }


  public isValid(piece: iPiece) {
    // console.log('piece.shape', piece.shape)
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

  public move(p: iPiece){
    if (this.currentPiece) {
        this.currentPiece.pos.x = p.pos.x
        this.currentPiece.pos.y = p.pos.y
      }
  }

  public draw() {
    const piece = this.currentPiece
    // console.log('piece', piece)
    this.tmpGrid = this.grid.map((row, y) => {
      return row.map((value, x) => {
        if (x >= piece.pos.x && y >= piece.pos.y && (x - piece.pos.x) <= piece.width && (y - piece.pos.y) <= piece.height) {
          value = value ? value : piece.shape[y - piece.pos.y][x - piece.pos.x]
        }
        return value
      })
    })
  }


  public getLineClearPoints(lines: number) {
    return lines === 1 ? POINTS.SINGLE :
         lines === 2 ? POINTS.DOUBLE :  
         lines === 3 ? POINTS.TRIPLE :     
         lines === 4 ? POINTS.TETRIS : 
         0;
  }

  public clearLinesForLife() {
        // Remove the rows.
        this.grid.splice(9, 10);
        // Add zero filled rows at the top. 
        for(let i = 0; i < 10; i++) {
          this.grid.unshift(Array(10).fill(0));
        }
  }
  
  public clearLines() {
    let lines: number = 0
    this.grid.forEach((row, y) => {
      // If every value is greater than 0.
      if (row.every(value => value > 0)) {
        lines++
        // Remove the row.
        this.grid.splice(y, 1);
        // Add zero filled row at the top. 
        this.grid.unshift(Array(10).fill(0));
      } 
    });

    const score = {
      points: this.getLineClearPoints(lines),
      lines: lines
    } 
    return score;  
  }


  public freeze() {
    this.currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.currentPiece.pos.y][x + this.currentPiece.pos.x] = value;
        }
      });
    });
    return this.clearLines()
  }

}
