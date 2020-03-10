import { Room } from "../server/models/Room";
import { Room as roomCli } from "../client/models/Room";
import { Player } from "../client/models/Player";
const socketConfig = require("./sockets/socket");

const app = require("express")();
const server = require("http").Server(app);

import * as ioClient from "socket.io-client";
// import * as chai from "chai";
// import * as ioServer from "socket.io";
// const assert = chai.assert;

let ioServer = require("socket.io")(server, {
  cookie: false,
  pingTimeout: 30000,
  pingInterval: 2000
});

let rooms: roomCli[] = [];

const socketUrl: string = "http://localhost:5000";
const options: any = {
  transports: ["websocket"],
  "force new connection": true
};

const playerTest: Player = {
  id: "player id",
  name: "player name",
  room: "11",
  state: false
};

const roomTest: roomCli = {
  id: "11",
  players: [playerTest],
  inGame: false,
  star: playerTest
};

const roomTest2 = new Room("11");
roomTest2.addPlayer(
  playerTest.id,
  playerTest.name,
  playerTest.state,
  playerTest.room
);
rooms.push(roomTest2);

describe("Server", () => {
  describe("Socket", () => {
    let client: SocketIOClient.Socket;

    beforeEach(() => {
      ioServer = socketConfig(rooms, ioServer);
      ioServer.listen(5000);
      client = ioClient.connect(socketUrl, options);
    });

    afterEach(() => {
      ioServer.close();
      client.close();
    });

    test("should test the socket connection", (done) => {
      ioServer.on("connect", (socket: any) => {
        // console.log(socket);
        if (socket) {
          done();
        }
      });
    });

    test('should register event "CreatePlayerId" ', (done) => {
      client.on("connect", () => {
        client.on("CreatePlayerId", (data: any) => {
          if (data) {
            done();
          }
        });
      });
    });

    test('should register event "Room"', (done) => {
      const data = playerTest;
      client.on("connect", () => {
        client.emit("Room", data);
        client.on("Room", (roomInfos: any) => {
          if (roomInfos && roomInfos.player && roomInfos.room) {
            done();
          }
        });
      });
    });

    test('should register event "Ready" ', (done) => {
      let dataToSend = {
        player: playerTest,
        room: roomTest2
      };
      client.on("connect", () => {
        client.emit("Ready", dataToSend);
        client.on("RefreshRoom", (data: any) => {
          if (
            data &&
            data.room &&
            data.room.players &&
            data.room.players[0].state
          ) {
            done();
          }
        });
      });
    });

    test('should register event "LeaveRoom" ', (done) => {
      const data = {
        player: playerTest,
        room: roomTest
      };
      client.on("connect", () => {
        client.emit("LeaveRoom", data);
        client.on("RefreshRoom", (data: any) => {
          if (data && data.room) {
            done();
          }
        });
      });
    });

    test('should register event "StartGame" ', (done) => {
      let dataToSend = {
        player: playerTest,
        room: roomTest2
      };
      client.on("connect", () => {
        client.emit("Ready", dataToSend);
        client.on("RefreshRoom", (data: any) => {
          console.log(data);
        });
        client.emit("StartGame", roomTest2);
        client.on("RefreshRoom", (data: any) => {
          if (data && data.room && (data.room.inGame || data.error)) {
            done();
          }
        });
      });
    });
  });
});
