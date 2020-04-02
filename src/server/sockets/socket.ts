import { Player, iPlayer } from "../../Shared/models/Player";
import { Room, iRoom } from "../../Shared/models/Room";
// import { Board } from '../models/Board';


const socketIo = require("socket.io");
const utils = require("../utils/utilitiesFunctions");
const game = require("../game/game");


const initialRoom = {
  id: "",
  players: [],
  inGame: false,
  star: {}
};

module.exports = function socketConfig(rooms: iRoom[], server: any) {
  const io = socketIo(server);

  const joinCreateRoom = (socket: any) => {
    interface idata {
      room: string;
      name: string;
      state: boolean;
    }
    socket.on("Room", async (data: idata) => {
      let error;
      let room: Room = utils.findRoomById(data.room, rooms);

      if (room) {
        if (room.isFull()) {
          error = "This room is already full...";
        } else if (room.inGame) {
          error = "This room is already in game...";
        } else {
          room.addPlayer(socket.id, data.name, data.room);
          room.settingsRoom.mode = {
            multiplayer: true,
            solo: false
          }
        }
      } else {
        room = utils.createNewRoom(data.room, rooms);
        room.addPlayer(socket.id, data.name, data.room);
      }
      const player = new Player(socket.id, data.name, data.room);
      console.log('room.piecesList[0]', room.piecesList[0])
      player.initBoard(room.piecesList[0])
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
      player: iPlayer;
      room: iRoom;
    }
    socket.on("Ready", (data: idata) => {
      // console.log("[ready]", data);

      let room: Room = utils.findRoomById(data.room.id, rooms);
      let updatedPlayer: iPlayer = new Player(data.player.id, data.player.name, data.player.room)
      updatedPlayer.state = !data.player.state
      if (room) {
        updatedPlayer.initBoard(room.piecesList[updatedPlayer.listIdx])
        room.updatePlayer(updatedPlayer);
        utils.refresh(socket, room, null, true);
      }
    });
  };

  const startGame = (socket: any) => {
    socket.on("StartGame", (room: Room) => {
      let newRoom = utils.findRoomById(room.id, rooms);
      if (newRoom) {
        newRoom.settingsRoom = room.settingsRoom
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
          
          if (newRoom.everyOneIsReady || (newRoom.players.length === 1 && newRoom.players[0].id === socket.id)) {
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
    game.startGame(socket)
    game.play(socket, rooms)
    // socket.on("disconnect", () => console.log("Client disconnected"));
  });
  return io;
};
