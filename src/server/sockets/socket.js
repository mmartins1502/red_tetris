const socketIo = require("socket.io");
const Player = require("../models/Player");
const Room = require("../models/Room");
const utils = require("../utils/utilitiesFunctions");

const initialRoom = {
  id: "",
  players: [],
  inGame: false,
  star: {}
};

module.exports = function socketConfig(rooms, server, players) {
  const io = socketIo(server);

  const joinCreateRoom = (socket) => {
    socket.on("Room", async (data) => {
      console.log("[joinCreateRoom]");
      let error;
      // !data.player.id ? socket.id : data.player.id;
      let room = utils.findRoomById(data.room, rooms);

      if (room) {
        if (room.isFull()) {
          error = "This room is already full...";
        } else if (room.inGame) {
          error = "This room is already in game...";
        } else {
          room.addPlayer(socket.id, data.name, data.state, data.room);
        }
      } else {
        room = utils.createNewRoom(data.room, rooms);
        room.addPlayer(socket.id, data.name, data.state, data.room);
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
      if (!error) {
        utils.refresh(socket, room, error, false);
      }
      socket.emit("Room", roomInfos);
    });
  };

  const leaveRoom = (socket) => {
    socket.on("LeaveRoom", (data) => {
      console.log("[leaveRoom]");
      let error, room;
      if (!data.player || !data.room) {
        error = "Missing data";
      } else {
        room = utils.findRoomById(data.room.id, rooms);
        if (room) {
          rooms = room.removePlayer(data.player.id, rooms);
        }
      }
      utils.refresh(socket, room, error, false);
      socket.emit("RefreshRoom", { room: initialRoom, error: undefined });
    });
  };

  const ready = (socket) => {
    socket.on("Ready", (data) => {
      console.log("[ready]");
      let updatedPlayer = {
        ...data.player
      };
      updatedPlayer.state = !data.player.state;
      let room = utils.findRoomById(data.room.id, rooms);
      if (room) {
        room.updatePlayer(updatedPlayer);
        utils.refresh(socket, room, null, true);
      }
    });
  };

  const startGame = (socket) => {
    socket.on("StartGame", (room) => {
      console.log("[startGame]");
      let newRoom = utils.findRoomById(room.id, rooms);
      if (newRoom) {
        let everyOneIsReady = true;
        for (var i = 0; i < newRoom.players.length; i++) {
          if (newRoom.players[i].state && newRoom.players[i].id !== socket.id) {
            everyOneIsReady = true;
          }
          if (
            !newRoom.players[i].state &&
            newRoom.players[i].id !== socket.id
          ) {
            everyOneIsReady = false;
          }
        }

        console.log("everyOneIsReady", everyOneIsReady);
        if (everyOneIsReady) {
          newRoom.startGame();
          utils.refresh(socket, newRoom, null, true);
        } else {
          utils.refresh(
            socket,
            newRoom,
            "All players must be ready to start a game...",
            true
          );
        }
      }
    });
  };

  io.on("connection", (socket) => {
    socket.emit("CreatePlayerId", socket.id);
    console.log("New client connected with id: " + socket.id);

    joinCreateRoom(socket);
    leaveRoom(socket);
    ready(socket);
    startGame(socket);
    // socket.on("disconnect", () => console.log("Client disconnected"));
  });
  return io;
};
