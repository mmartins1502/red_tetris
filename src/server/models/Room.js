const Player = require("./Player");

module.exports = class Room {
  constructor(id, playerId, playerName) {
    this.id = id;
    this.players = [];
    this.inGame = false;
    this.star = this.players[0];
    playerId && playerName ? this.addPlayer(playerId, playerName) : null;
  }

  addPlayer(playerId, playerName) {
    let player = {
      id: playerId,
      name: playerName
    };
    this.players.push(player);
    !this.star ? (this.star = player) : (this.star = this.players[0]);
  }

  getPlayers() {
    return this.players;
  }

  startGame() {
    this.inGame = true;
  }

  isFull() {
    return this.players.length > 3 ? true : false;
  }

  removePlayer(playerId, rooms) {
    this.players = this.players.filter((player) => player.id !== playerId);
    this.players.length >= 1
      ? (this.star = this.players[0])
      : (rooms = rooms.filter((room) => room.id !== this.id));
    return rooms;
  }

  endGame() {
    this.inGame = false;
  }
};
