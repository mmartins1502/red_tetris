// import { Player } from "../../common/models/Player";
import { Room, iRoom } from "../../Shared/models/Room";
import { iPlayer } from 'Shared/models/Player';

export const createNewRoom = (id: string, rooms: Room[]) => {
  let room = new Room(id);
  rooms.push(room);
  return room as Room
};

export const findRoomById = (id: string, rooms: iRoom[]) => {
  const room = rooms.find((room) => {
    return room.id === id;
  });
  return room as iRoom
};

export const refresh = (socket: any, room: iRoom, error: string, all: boolean) => {
  // console.log("[refresh : Room Infos]", room);
  if (room) {
    room.players.map((player: iPlayer) => {
      return socket
        .to(player.id)
        .emit("RefreshRoom", { room: room, error: error });
    });
    if (all) {
      socket.emit("RefreshRoom", { room: room, error: error });
    }
  }
};

