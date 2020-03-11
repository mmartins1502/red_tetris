import { Player } from "./Player";

export class Room {
  id: string;
  players: Player[];
  inGame: boolean;
  star: Player;
  everyOneIsReady: boolean;

  constructor(id: string) {
    this.id = id;
    this.players = [];
    this.inGame = false;
    this.star = this.players[0];
    this.everyOneIsReady = false;
  }

  public addPlayer(
    playerId: string,
    playerName: string,
    playerState: boolean,
    playerRoom: string
  ) {
    let player = {
      id: playerId,
      name: playerName,
      room: playerRoom,
      state: playerState
    };
    this.players.push(player);
    !this.star ? (this.star = player) : (this.star = this.players[0]);
  }

  // public getPlayers() {
  //   return this.players;
  // }

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
