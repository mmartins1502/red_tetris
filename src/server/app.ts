import { Room } from "../Shared/models/Room";
// import { Board } from '../common/models/Board';

const http = require("http");
const port = 4001;
const server = http.createServer();
const socketConfig = require("./sockets/socket");


let rooms: Room[] = [];

const ioServer = socketConfig(rooms, server);

ioServer.listen(port, () => console.log(`Listening on port ${port}`));
