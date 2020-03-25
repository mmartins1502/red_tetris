// import { Player } from "../../common/models/Player";
import { Room } from "../../Shared/models/Room";

const createNewRoom = (id: string, rooms: Room[]) => {
  let room = new Room(id);
  rooms.push(room);
  return room as Room
};

const findRoomById = (id: string, rooms: Room[]) => {
  const room = rooms.find((room) => {
    return room.id === id;
  });
  return room as Room
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
  findRoomById,
  refresh
};
