const socketIo = require("socket.io");
const utils = require("../utils/utilitiesFunctions");

import { Player } from "../models/Player";
import { Room } from "../models/Room";

const initialRoom = {
  id: "",
  players: [],
  inGame: false,
  star: {}
};

module.exports = function socketConfig(rooms: Room[], server: any) {
  const io = socketIo(server);

  const joinCreateRoom = (socket: any) => {
    interface idata {
      room: string;
      name: string;
      state: boolean;
    }
    socket.on("Room", async (data: idata) => {
      let error;
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
      const player = utils.createNewPlayer(socket.id, data.name, data.room);

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

  const leaveRoom = (socket: any) => {
    interface idata {
      player: Player;
      room: Room;
    }

    socket.on("LeaveRoom", (data: idata) => {
      // console.log("[leaveRoom]");
      let room;
      room = utils.findRoomById(data.room.id, rooms);
      if (room) {
        rooms = room.removePlayer(data.player.id, rooms);
      }
      utils.refresh(socket, room, null, false);
      socket.emit("RefreshRoom", { room: initialRoom, error: undefined });
    });
  };

  const ready = (socket: any) => {
    interface idata {
      player: Player;
      room: Room;
    }
    socket.on("Ready", (data: idata) => {
      // console.log("[ready]", data);
      let updatedPlayer = {
        ...data.player,
        state: !data.player.state
      };
      let room: Room = utils.findRoomById(data.room.id, rooms);
      if (room) {
        room.updatePlayer(updatedPlayer);
        utils.refresh(socket, room, null, true);
      }
    });
  };

  const startGame = (socket: any) => {
    socket.on("StartGame", (room: Room) => {
      // console.log("[startGame]", room);
      let newRoom = utils.findRoomById(room.id, rooms);
      if (newRoom) {
        // let everyOneIsReady = true;
        for (var i = 0; i < newRoom.players.length; i++) {
          if (newRoom.players[i].state && newRoom.players[i].id !== socket.id) {
            newRoom.everyOneIsReady = true;
          }
          if (
            !newRoom.players[i].state &&
            newRoom.players[i].id !== socket.id
          ) {
            newRoom.everyOneIsReady = false;
          }
        }

        // console.log("everyOneIsReady", newRoom.everyOneIsReady);
        if (newRoom.everyOneIsReady) {
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

  io.on("connection", (socket: any) => {
    socket.emit("CreatePlayerId", socket.id);
    // console.log("New client connected with id: " + socket.id);

    joinCreateRoom(socket);
    leaveRoom(socket);
    ready(socket);
    startGame(socket);
    // socket.on("disconnect", () => console.log("Client disconnected"));
  });
  return io;
};
