import { Player } from "../../Shared/models/Player"
import { Room } from '../../Shared/models/Room'
import { Board } from '../../Shared/models/Board'
import { Piece } from '../../Shared/models/Piece'




interface iData {
    player: Player;
    room: Room;
}

const startGame = (socket: any) => {
    socket.on("initialBoard", (data: iData) => {
        // let board = new Board(data.room.piecesList[0])
        // board.draw()
        // data.player.board = board
        // socket.emit("Board", {player: data.player, room: data.room, error: undefined})
    })
}


interface iData {
    player: Player;
    room: Room;
    move: string;
}

const KEY = {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    SPACE: " ",
    UP: "ArrowUp"
  }
  Object.freeze(KEY);

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
  }
  Object.freeze(POINTS);

const moves = {
[KEY.LEFT]: (p: Piece) => ({ ...p, pos:{...p.pos, x: p.pos.x - 1}} as Piece),
[KEY.RIGHT]: (p: Piece) => ({ ...p, pos:{...p.pos, x: p.pos.x + 1}} as Piece),
[KEY.DOWN]: (p: Piece) => ({ ...p, pos:{...p.pos, y: p.pos.y + 1}} as Piece),
[KEY.SPACE]: (p: Piece) => ({ ...p, pos:{...p.pos, y: p.pos.y + 1}} as Piece),
[KEY.UP]: (p: Piece) => p.currentPieceRotation(p)
};


const play = (socket: any) => {
    socket.on("Board", (data: iData) => {
        const {player, room, move} = data
        let board = new Board(room.piecesList[player.listIdx])

        if (move && player.board && player.board.currentPiece) {
            // console.log('player.board.grid', player.board.grid)
            let pos = {
                y: player.board.currentPiece.pos.y,
                x: player.board.currentPiece.pos.x 
            }
            let piece = new Piece(player.board.currentPiece.letter, pos);
            board.currentPiece = piece
            board.currentPiece.shape = player.board.currentPiece.shape

            board.grid = player.board.grid
            if (move === KEY.UP) {
                if (!room.settings.options.noRotation) {
                    let p = moves[KEY.UP](board.currentPiece)
                    if (board.isValid(p)) {
                        board.currentPiece  = board.currentPiece.currentPieceRotation(board.currentPiece)
                    }
                }
            } else {
                let p = moves[move](board.currentPiece);
                // Hard drop
                if (move === KEY.SPACE) {
                    while (board.isValid(p)) {
                        board.move(p);   
                        p = moves[KEY.DOWN](board.currentPiece);
                      }
                // Other moves
                } else if (board.isValid(p)) {    
                    // If the move is valid, move the piece.
                    board.move(p);
                } else if (!board.isValid(p) && move === KEY.DOWN) {
                    // Piece is down => save pos, clear lines ? & new current piece | GAME OVER
                    board.freeze()
                    player.listIdx++
                    if (!room.piecesList[player.listIdx + 3]) {
                        room.piecesList = room.generator()  
                    }
                    let p = new Piece(room.piecesList[player.listIdx])
                    board.isValid(p) ? board.currentPiece = p : board.gameOver = true
                }
            }
        }                
        board.draw()
        player.board = board
        socket.emit("Board", {player: player, room: room, error: undefined})
    })
}

module.exports = {
    startGame,
    play  
}