import { Player, iPlayer } from "../../Shared/models/Player"
import { iRoom } from '../../Shared/models/Room'
import { Board, iBoard, iScore } from '../../Shared/models/Board'
import { Piece, iPiece } from '../../Shared/models/Piece'
import { randomizer } from '../utils/randomizer'
import * as utils from "../utils/utilitiesFunctions"




interface iData {
    player: iPlayer;
    room: iRoom;
}

export const startGame = (socket: any) => {
    socket.on("initialBoard", (data: iData) => {
        if (data.room.settingsRoom.difficulty.hard) {
            data.player.account.life = 1
        }
        socket.emit("Board", {player: data.player, room: data.room, error: undefined})
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
    for(let i = 0; i < 15; i++) {
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
          },
          account: {
              ...player.account
          }
      }
      let newRoom: iRoom = utils.findRoomById(room.id, rooms);
      if (newRoom) {
        newRoom.players = room.players
        newRoom.updatePlayer(updatedPlayer);
        newRoom.piecesList = room.piecesList
        newRoom.settingsRoom = room.settingsRoom
        utils.refresh(socket, newRoom, "", true);
      }
}



const indestructiblesLines = (score: iScore, room: iRoom, socket: any, rooms: iRoom[]) => {
    const {players} = room
    if (score.lines > 1) {
        players.map((player: iPlayer) => {
            if (player.id !== socket.id && player.board) {
                let grid = player.board?.grid
                for (let i = 1; i < score.lines; i++ ) {
                    grid?.push(Array(10).fill(-1));
                }
                grid?.splice(0, score.lines -1);
                player.board.grid = grid
                return player
            } else return player
        })
    }
    let newRoom: iRoom = utils.findRoomById(room.id, rooms)
    newRoom.players = room.players
    newRoom.malus = score.lines -1
    newRoom.settingsRoom = room.settingsRoom
    utils.refresh(socket, newRoom, "", false)
}


const GameOverOrNot = (board: iBoard, player: iPlayer, room: iRoom) => {
    if (player.account.life === 1) {
        board.gameOver = true
    } else {
        board.clearLinesForLife()
        player.account.life--
        board.currentPiece = new Piece(room.piecesList[player.listIdx++])
    }
}




export const play = (socket: any, rooms: iRoom[]) => {
    socket.on("Board", (data: iData) => {
        const {player, room, move} = data
        let board: iBoard = new Board(room.piecesList[player.listIdx])
        if (move && player.board && player.board.currentPiece) {
            room.players.map((play: iPlayer) => {
                if (player.id === play.id && player.board && play.board && player.board.grid !== play.board.grid) {
                    player.board.grid = play.board.grid
                    if (player.board.currentPiece.pos.y >= 20 - room.malus) player.board.currentPiece.pos.y -= room.malus
                }
                return play
            })

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
                        board.currentPiece  = p //board.currentPiece.currentPieceRotation(board.currentPiece)
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
                    if (!room.piecesList[player.listIdx + 3]) {
                        room.piecesList = generator(room.piecesList)  
                    }
                    
                    if (score.lines > 1 && room.players.length > 1) indestructiblesLines(score, room, socket, rooms)
                    
                    let p = new Piece(room.piecesList[player.listIdx])
                    if (board.isValid(p)) {
                        board.currentPiece = p 
                    } else {
                        GameOverOrNot(board, player, room)
                    }
                    refreshPlayerGameInRoom(player, room, socket, rooms)
                }
            }
        }                
        board.draw()
        player.board = board
        socket.emit("Board", {player: player, error: undefined})
    })
}