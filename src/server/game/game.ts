import { Player, iPlayer } from "../../Shared/models/Player"
import { iRoom } from '../../Shared/models/Room'
import { Board, iBoard } from '../../Shared/models/Board'
import { Piece, iPiece } from '../../Shared/models/Piece'
import { randomizer } from '../utils/randomizer'

const utils = require("../utils/utilitiesFunctions");




interface iData {
    player: iPlayer;
    room: iRoom;
}

export const startGame = (socket: any) => {
    socket.on("initialBoard", (data: iData) => {
        // let board = new Board(data.room.piecesList[0])
        // board.draw()
        // data.player.board = board
        // socket.emit("Board", {player: data.player, room: data.room, error: undefined})
    })
}


interface iData {
    player: iPlayer;
    room: iRoom;
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

export const POINTS = {
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

const generator = (piecesList: any) => {
    let random = randomizer()
    for(let i = 0; i < 5; i++) {
      piecesList.push(random.next().value)
    }
    return piecesList
  }


const refreshPlayerGameInRoom = (player: iPlayer, room: iRoom, socket: any, rooms: iRoom[]) => {
    let updatedPlayer: iPlayer = new Player(player.id, player.name, player.room)
    let newBoard: iBoard = new Board(room.piecesList[player.listIdx])
    newBoard.grid = player.board ? player.board.grid : newBoard.grid
      updatedPlayer = {
          ...player,
          board: {
              ...newBoard
          }
      }
      let newRoom: iRoom = utils.findRoomById(room.id, rooms);
      if (newRoom) {
        newRoom.updatePlayer(updatedPlayer);
        console.log('updatedPlayer.board.grid', updatedPlayer.board?.grid)
        utils.refresh(socket, newRoom, null, true);
      }
}

export const play = (socket: any, rooms: iRoom[]) => {
    socket.on("Board", (data: iData) => {
        const {player, room, move} = data
        let board: iBoard = new Board(room.piecesList[player.listIdx])

        if (move && player.board && player.board.currentPiece) {
            // console.log('player.board.grid', player.board.grid)
            let pos = {
                y: player.board.currentPiece.pos.y,
                x: player.board.currentPiece.pos.x 
            }
            let piece: iPiece = new Piece(player.board.currentPiece.letter, pos);
            board.currentPiece = piece
            board.currentPiece.shape = player.board.currentPiece.shape
            board.grid = player.board.grid
            if (move === KEY.UP) {
                if (!room.settingsRoom.options.noRotation) {
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
                        player.account.points += POINTS.HARD_DROP;
                        board.move(p);   
                        p = moves[KEY.DOWN](board.currentPiece);
                      }
                // Other moves
                } else if (board.isValid(p)) {    
                    // If the move is valid, move the piece.
                    board.move(p);
                    if (move === KEY.DOWN) {
                        player.account.points += POINTS.SOFT_DROP;
                      }
                } else if (!board.isValid(p) && move === KEY.DOWN) {
                    // Piece is down => save pos, clear lines ? & new current piece | GAME OVER
                    let score = board.freeze()
                    player.account.points += score.points
                    player.account.lines += score.lines
                    player.listIdx++
                    if (room.settingsRoom.mode.multiplayer && room.settingsRoom.difficulty.easy){
                        refreshPlayerGameInRoom(player, room, socket, rooms)
                    }
                    if (!room.piecesList[player.listIdx + 3]) {
                        room.piecesList = generator(room.piecesList)  
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

// module.exports = {
//     startGame,
//     play  
// }