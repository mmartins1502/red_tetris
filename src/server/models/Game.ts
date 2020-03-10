import { Player } from "./Player";

class Game {
  id: string;
  name: string;
  onGame: boolean;
  players: Player[];

  constructor(id: string, player: Player, roomName: string) {
    this.id = id;
    this.name = roomName;
    this.onGame = false;
    this.players = [player];
  }

  getOnGame() {
    return this.onGame;
  }

  setOnGame() {
    this.onGame = !this.onGame;
  }

  playerLeave(playerId: string) {
    this.players = this.players.filter((player) => {
      return player.id != playerId;
    });
  }

  playerJoin(player: Player) {
    this.players.push(player);
  }
}

export default Game;
