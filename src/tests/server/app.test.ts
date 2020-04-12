import * as ioClient from "socket.io-client";
// import { Player, iPlayer } from '../../Shared/models/Player';
import { Room } from '../../Shared/models/Room';

import {socketConfig} from "../../Server/sockets/socket";

const app = require("express")();
const server = require("http").Server(app);


let ioServer = require("socket.io")(server, {
  cookie: false,
  pingTimeout: 30000,
  pingInterval: 2000
});

let rooms: Room[] = [];

const socketUrl: string = "http://localhost:5000";
const options: any = {
  transports: ["websocket"],
  "force new connection": true
};

const playerTest = {
  id: "player id",
  name: "player name",
  room: "666",
};

const playerTest3 = {
  id: "player id",
  name: "player name",
  room: "12",
};

const roomTest = new Room("1");
rooms.push(roomTest);

const roomTest2 = new Room("11");
roomTest2.addPlayer("id test1", "name test1", "11");
roomTest2.addPlayer("id test2", "name test2", "11");
roomTest2.addPlayer("id test3", "name test3", "11");
roomTest2.addPlayer("id test4", "name test4", "11");
rooms.push(roomTest2);

const roomTest3 = new Room("12");
roomTest3.addPlayer("id test1", "name test1", "12");
roomTest3.addPlayer("id test2", "name test2", "12");
roomTest3.startGame();
rooms.push(roomTest3);

const roomTest4 = new Room("13");
roomTest4.addPlayer("id test1", "name test1", "13");
roomTest4.addPlayer("id test2", "name test2", "13");
roomTest4.startGame();
rooms.push(roomTest4);

describe("Server", () => {
  describe("Socket Events", () => {
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

    test('should register event "Room" with a full room error', (done) => {
      const playerTest2 = {
        id: "player id",
        name: "player name",
        room: "11",
      };

      client.on("connect", () => {
        client.emit("Room", playerTest2);
        client.on("Room", (roomInfos: any) => {
          if (
            roomInfos &&
            roomInfos.error &&
            roomInfos.error === "This room is already full..."
          ) {
            done();
          }
        });
      });
    });

    test('should register event "Room" with a inGame room error', (done) => {
      client.on("connect", () => {
        client.emit("Room", playerTest3);
        client.on("Room", (roomInfos: any) => {
          if (
            roomInfos &&
            roomInfos.error &&
            roomInfos.error === "This room is already in game..."
          ) {
            done();
          }
        });
      });
    });

    test('should register event "Room" with an existing room', (done) => {
      const data = playerTest3;
      roomTest3.endGame();
      client.on("connect", () => {
        client.emit("Room", data);
        client.on("Room", (roomInfos: any) => {
          if (roomInfos && roomInfos.player && roomInfos.room) {
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
        player: {
          ...playerTest,
          room: "13"
        },
        room: roomTest4
      };
      client.on("connect", () => {
        client.emit("Ready", dataToSend);
        client.on("RefreshRoom", (data: any) => {});
        client.emit("StartGame", roomTest4);
        client.on("RefreshRoom", (data: any) => {
          if (data && data.room && data.room.inGame) {
                done();
          }
        });
      });
    });

  });

  describe("should test Room's methods", () => {
    const roomTest5 = new Room("2");
    roomTest5.addPlayer("id test1", "name test1", "2");
    rooms.push(roomTest5);

    const roomTest6 = new Room("3");
    roomTest6.addPlayer("id test1", "name test1", "3");
    rooms.push(roomTest6);

    test("removePlayer if it's the last one", (done) => {
      const roomsLengthBefore = rooms.length;
      rooms = roomTest6.removePlayer("id test1", rooms);
      if (roomsLengthBefore > rooms.length) {
        done();
      }
    });
  });
});