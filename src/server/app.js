const http = require("http");

const port = 4001;

const server = http.createServer();
const socketConfig = require("./sockets/socket");

const Player = require("./models/Player");
const Room = require("./models/Room");

let players = [];
let rooms = [];

socketConfig(rooms, server, players);

////////////////////////////////////////////////////////////////////////////////////////////

players.push(new Player("1246", "jose", "12"));
players.push(new Player("1s46", "max", "12"));
players.push(new Player("13546", "lulu", "12"));
players.push(new Player("134646", "lhermann", "12"));

players.push(new Player("12463", "jose", "11", true));
players.push(new Player("1s463", "max", "11", true));
players.push(new Player("135463", "lulu", "11", true));

rooms.push(new Room("10"));
rooms.push(new Room("11"));
rooms.push(new Room("12"));
let room = rooms.find((room) => {
  return room.id === "12";
});
room.addPlayer("1246", "jose");
room.addPlayer("1s46", "max");
room.addPlayer("13546", "lulu");
room.addPlayer("134646", "lhermann");

let room2 = rooms.find((room) => {
  return room.id === "11";
});
room2.addPlayer("12463", "jose", true);
room2.addPlayer("1s463", "max", true);
room2.addPlayer("135463", "lulu", true);

////////////////////////////////////////////////////////////////////////////////////////////

server.listen(port, () => console.log(`Listening on port ${port}`));
