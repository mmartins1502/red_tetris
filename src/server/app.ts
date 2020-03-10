const http = require("http");
const port = 4001;
const server = http.createServer();
const socketConfig = require("./sockets/socket");

import { Room } from "./models/Room";

// let players: Player[] = [];
let rooms: Room[] = [];

const ioServer = socketConfig(rooms, server);

////////////////////////////////////////////////////////////////////////////////////////////

rooms.push(new Room("10"));
rooms.push(new Room("11"));
rooms.push(new Room("12"));
let room = rooms.find((room) => {
  return room.id === "12";
});
if (room) {
  room.addPlayer("1246", "jose", false, "12");
  room.addPlayer("1s46", "max", false, "12");
  room.addPlayer("13546", "lulu", false, "12");
  room.addPlayer("134646", "lhermann", false, "12");
}

let room2 = rooms.find((room) => {
  return room.id === "11";
});
if (room2) {
  room2.addPlayer("12463", "jose", true, "11");
  room2.addPlayer("1s463", "max", true, "11");
  room2.addPlayer("135463", "lulu", true, "11");
}

////////////////////////////////////////////////////////////////////////////////////////////

ioServer.listen(port, () => console.log(`Listening on port ${port}`));
