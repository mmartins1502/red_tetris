import { Player } from "./Player";
import { Board } from './Board';
import { Piece } from './Piece';

export class Room {
  id: string;
  players: Player[];
  inGame: boolean;
  star: Player;
  everyOneIsReady: boolean;
  piecesList: Piece[]

  constructor(id: string) {
    this.id = id;
    this.players = [];
    this.inGame = false;
    this.star = this.players[0];
    this.everyOneIsReady = false;
    this.piecesList = this.generator()

  }

  private generator() {
    const pieces: Piece[] = []
    for(let i = 0; i < 500; i++) {
      const piece = new Piece()
      pieces.push(piece)
    }
    return pieces
  }

  public addPlayer(
    playerId: string,
    playerName: string,
    playerState: boolean,
    playerRoom: string,
    playerBoard: Board,
    playerIdxPiece: number
  ) {
    let player = {
      id: playerId,
      name: playerName,
      room: playerRoom,
      state: playerState,
      board: playerBoard,
      listIdx: playerIdxPiece
    };

    this.players.push(player);
    !this.star ? (this.star = player) : (this.star = this.players[0]);
  }

  public startGame() {
    this.inGame = true;
  }

  public isFull() {
    return this.players.length > 3 ? true : false;
  }

  public removePlayer(playerId: string, rooms: Room[]) {
    this.players = this.players.filter((player) => player.id !== playerId);
    this.players.length >= 1
      ? (this.star = this.players[0])
      : (rooms = rooms.filter((room) => room.id !== this.id));
    return rooms;
  }

  public updatePlayer(updatedPlayer: Player) {
    this.players = this.players.map((player) => {
      if (player.id === updatedPlayer.id) {
        return updatedPlayer;
      } else {
        return player;
      }
    });
  }

  public endGame() {
    this.inGame = false;
  }
}
