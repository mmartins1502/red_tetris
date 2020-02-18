module.exports = class Game {
  constructor(id, player, roomName) {
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

  playerLeave(playerId) {
    this.players = this.players.filter((player) => {
      return player.socketId != playerId;
    });
  }

  playerJoin(player) {
    this.players.push(player);
  }
};
