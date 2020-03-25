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
        // Clone with JSON for immutability.
        let clone: Piece = JSON.parse(JSON.stringify(p));
        // Transpose matrix, p is the Piece.
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
            [p.shape[x][y], p.shape[y][x]] = 
            [p.shape[y][x], p.shape[x][y]];
            }
        }
        // Reverse the order of the columns.
        p.shape.forEach(row => row.reverse());
  
        return clone;
    }

}
