import { Player } from "../models/Player";
import { Room } from "../models/Room";

const createNewRoom = (id: string, rooms: Room[]) => {
  let room = new Room(id);
  rooms.push(room);
  return room;
};

const createNewPlayer = (id: string, name: string, roomId: string) => {
  let player = new Player(id, name, roomId);
  return player;
};

const findRoomById = (id: string, rooms: Room[]) => {
  const room = rooms.find((room) => {
    return room.id === id;
  });
  return room;
};

const refresh = (socket: any, room: Room, error: string, all: boolean) => {
  // console.log("[refresh : Room Infos]", room);
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
  refresh
};
