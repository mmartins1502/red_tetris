const Room = require("../models/Room");
const Player = require("../models/Player");

const createNewRoom = (id, rooms) => {
  let room = new Room(id);
  rooms.push(room);
  return room;
};

const createNewPlayer = (id, name, roomId, players) => {
  let player = new Player(id, name, roomId);
  players.push(player);
  return player;
};

const findRoomById = (id, rooms) => {
  const room = rooms.find((room) => {
    return room.id === id;
  });
  return room;
};

const findRoomByPlayerId = (id, players, rooms) => {
  let room;
  const player = players.find((player) => {
    return player.id === id;
  });
  if (player) {
    room = rooms.find((room) => {
      return room.id === player.room;
    });
  }
  return room;
};

const refresh = (socket, room, error, all) => {
  console.log("[refresh : Room Infos]", room);
  if (room) {
    room.players.map((player) => {
      return socket
        .to(player.id)
        .emit("RefreshRoom", { room: room, error: error });
    });
    if (all) {
      socket.emit("RefreshRoom", { room: room, error: error });
    }
  }
};

module.exports = {
  createNewRoom,
  createNewPlayer,
  findRoomById,
  findRoomByPlayerId,
  refresh
};