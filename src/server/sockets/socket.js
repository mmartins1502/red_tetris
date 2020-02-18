const socketIo = require("socket.io");
const Player = require("../models/Player");
const Room = require("../models/Room");
const utils = require("../utils/utilitiesFunctions");

module.exports = function socketConfig(rooms, server, players) {
  const io = socketIo(server);

  const joinCreateRoom = (socket) => {
    socket.on("Room", async (data) => {
      console.log("[joinCreateRoom]", data);
      let error;
      // !data.player.id ? socket.id : data.player.id;
      let room = utils.findRoomById(data.room, rooms);

      if (room) {
        room.isFull()
          ? (error = "This room is already full...")
          : room.addPlayer(socket.id, data.name);
      } else {
        room = utils.createNewRoom(data.room, rooms);
        room.addPlayer(socket.id, data.name);
      }
      const player = utils.createNewPlayer(
        socket.id,
        data.name,
        data.room,
        players
      );

      const roomInfos = {
        player: player,
        room: room,
        error: error
      };
      utils.refresh(socket, room, error);
      socket.emit("Room", roomInfos);
    });
  };

  const leaveRoom = (socket) => {
    socket.on("LeaveRoom", (data) => {
      console.log("leaveRoom");
      let error, room;
      if (!data.player || !data.room) {
        error = "Missing data";
      } else {
        room = utils.findRoomById(data.room.id, rooms);
        if (room) {
          rooms = room.removePlayer(data.player.id, rooms);
        }
      }
      utils.refresh(socket, room, error);
    });
  };

  const startGame = (socket) => {
    socket.on("StartGame", (room) => {
      console.log("startGame");
      let newRoom = utils.findRoomById(room.id, rooms);
      if (newRoom) {
        newRoom.startGame();
        utils.refresh(socket, newRoom, null);
      }
    });
  };

  io.on("connection", (socket) => {
    socket.emit("CreatePlayerId", socket.id);
    console.log("New client connected with id: " + socket.id);

    joinCreateRoom(socket);
    leaveRoom(socket);
    startGame(socket);
    // socket.on("disconnect", () => console.log("Client disconnected"));
  });
  return io;
};
