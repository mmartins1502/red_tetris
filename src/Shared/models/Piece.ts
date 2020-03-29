import { pieces } from './Pieces';

interface iPos {
    x: number;
    y: number;
}


export class Piece {
    shape: Array<Array<number>>;
    color: string;
    width: number;
    height: number;
    pos: iPos;
    letter: string;

    
    constructor(letter: string, pos = {x: 4, y: 0}) {
        this.letter = letter
        let piece: any = pieces.find((p) => p.name === letter)
        this.shape = piece.shape;
        this.color = piece.color;
        this.width = this.shape[0].length - 1;
        this.height = this.shape.length - 1;
        this.pos = pos;
    }

    public currentPieceRotation(p: Piece){
        let clone: Piece = JSON.parse(JSON.stringify(p));
          // Transpose matrix
          for (let y = 0; y < clone.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
              [clone.shape[x][y], clone.shape[y][x]] = 
              [clone.shape[y][x], clone.shape[x][y]];
            }
          }
          // Reverse the order of the columns.
          clone.shape.forEach((row: any) => row.reverse());
        
        return clone;
    }

}
