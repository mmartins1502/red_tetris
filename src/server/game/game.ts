import { Player } from "../models/Player"
import { Room } from '../models/Room'
import { Board } from '../models/Board'
import { Piece } from '../models/Piece'
// const utilGame = require('../utils/gameFunctions')


interface iData {
    player: Player;
    room: Room;
}

const startGame = (socket: any) => {
    socket.on("initialBoard", (data: iData) => {
        let board = new Board()
        board.currentPiece = data.room.piecesList[0]
        board.current()
        data.room.players = data.room.players.map((player: Player) => {
            player.board = board
            return player
        });
        const player = data.room.players.find((player: Player) => {
            return player.id === socket.id
        })
        socket.emit("Board", {player: player, room: data.room, error: undefined})
    })
}


interface iData {
    player: Player;
    room: Room;
    move: string;
}

const play = (socket: any) => {
    socket.on("Board", (data: iData) => {
        const {player, room, move} = data
        let board = new Board(player.board.grid)
        if (move && player.board.currentPiece) {
            let pos = {
                y: player.board.currentPiece.pos.y,
                x: player.board.currentPiece.pos.x 
            }
            let piece = new Piece(player.board.currentPiece.nb, player.board.currentPiece.rotate.current, pos);
            if (move === "ArrowUp") {
                piece.currentPieceRotation()
                player.board.currentPiece = piece
                board.currentPiece = player.board.currentPiece
            }
            if (move === "ArrowRight" || move === "ArrowLeft") {
                board.currentPiece = player.board.currentPiece
                move === "ArrowRight" ? board.currentPiece.pos.x++ : board.currentPiece.pos.x--
            }
            if (move === "ArrowDown" ) {
                board.currentPiece = player.board.currentPiece
                board.currentPiece.pos.y++
            }
        }
        board.current()
        player.board = board
        socket.emit("Board", {player: player, room: room, error: undefined})
    })
}

module.exports = {
    startGame,
    play  
}