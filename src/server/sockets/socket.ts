import { Player, iPlayer } from "../../Shared/models/Player";
import { Room, iRoom } from "../../Shared/models/Room";

import socketIo from "socket.io";
import * as utils from "../utils/utilitiesFunctions";
import * as game from "../game/game";


const initialRoom = new Room("")

export const socketConfig = (rooms: iRoom[], server: any) => {
  const io = socketIo(server);

  const joinCreateRoom = (socket: any) => {
    interface idata {
      room: string;
      name: string;
    }
    socket.on("Room", async (data: idata) => {
      let error = "";
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
      player: iPlayer;
      room: iRoom;
    }

    socket.on("LeaveRoom", (data: idata) => {
      // console.log("[leaveRoom]");
      let room;
      room = utils.findRoomById(data.room.id, rooms);
      if (room) {
        rooms = room.removePlayer(data.player.id, rooms);
      }
      utils.refresh(socket, room, "", false);
      socket.emit("RefreshRoom", { room: initialRoom, error: undefined });
    });
  };

  const startGame = (socket: any) => {
    socket.on("StartGame", (room: iRoom) => {
      let newRoom = utils.findRoomById(room.id, rooms);
      if (newRoom) {
        newRoom.players = room.players
        newRoom.settingsRoom = room.settingsRoom
        newRoom.startGame();
        newRoom.game.location = "Game"
        utils.refresh(socket, newRoom, "", true);
      }
    });
  };

  io.on("connection", (socket: any) => {
    socket.emit("CreatePlayerId", socket.id);
    joinCreateRoom(socket);
    leaveRoom(socket);
    startGame(socket);
    game.startGame(socket)
    game.play(socket, rooms)
    game.resetRoom(socket)

    // socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on('disconnect', (reason: string) => {
      if (reason === 'io server disconnect') {
        // console.log("Client disconnected, we try to reconnect him")
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });
  });
  return io;
};
