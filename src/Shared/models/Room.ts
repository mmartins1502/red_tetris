import { Player } from "./Player";
// import { Board } from './Board';
// import { Piece } from './Piece';
import {randomizer} from '../../server/utils/randomizer'
// import { pieces } from './Pieces';

export class Room {
  id: string;
  players: Player[];
  inGame: boolean;
  star: Player;
  everyOneIsReady: boolean;
  piecesList: any
  speed: number

  constructor(id: string) {
    this.id = id;
    this.players = [];
    this.inGame = false;
    this.star = this.players[0];
    this.everyOneIsReady = false;
    this.piecesList = []
    this.piecesList = this.generator()
    this.speed = 250

  }

  private generator() {
    let random = randomizer()
    for(let i = 0; i < 15; i++) {
      this.piecesList.push(random.next().value)
    }
    // console.log('this.piecesList', this.piecesList)
    return this.piecesList
  }

  public addPlayer(
    playerId: string,
    playerName: string,
    playerRoom: string,
  ) {

    let player = new Player(playerId, playerName, playerRoom)

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
