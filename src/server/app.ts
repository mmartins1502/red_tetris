import { Room } from "../Shared/models/Room";
// import { Board } from '../common/models/Board';
import {socketConfig} from "./sockets/socket";

const http = require("http");
const port = 4001;
const server = http.createServer();


let rooms: Room[] = [];

const ioServer = socketConfig(rooms, server);

ioServer.listen(port);
