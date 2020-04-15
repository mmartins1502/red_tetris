import * as ioClient from "socket.io-client";
import { Room, iRoom } from '../../Shared/models/Room';

import {socketConfig} from "../../Server/sockets/socket";
import { Player, iPlayer } from '../../Shared/models/Player';
import { Piece } from '../../Shared/models/Piece';

const app = require("express")();
const server = require("http").Server(app);


let ioServer = require("socket.io")(server, {
  cookie: false,
  pingTimeout: 30000,
  pingInterval: 2000
});

let rooms: Room[] = [];

const socketUrl: string = "http://localhost:5001";
const options: any = {
  transports: ["websocket"],
  "force new connection": true
};


const grid = [ 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ]
]

const gameOverGrid = [ 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ]
]

const playerTest: iPlayer = new Player("id player", "name", "room1")
const roomTest: iRoom = new Room("room1")
roomTest.addPlayer("id player", "name", "room1")
rooms.push(roomTest)

describe("Game server part", () => {
    let client: SocketIOClient.Socket;

    beforeEach(() => {
        ioServer = socketConfig(rooms, ioServer);
        ioServer.listen(5001);
        client = ioClient.connect(socketUrl, options);
    })
    afterEach(()=> {
        ioServer.close();
        client.close();
    })

    it("should test the socket connection", (done) => {
        ioServer.on("connect", (socket: any) => {
          expect(socket).toBeDefined() 
          done();
        });
      });

    describe("startGame function", ()=> {
        const data = {
            player: playerTest, 
            room: roomTest
        }
        data.room.inGame = true
        data.room.game.location = "Game"
        data.player.initBoard(data.room.piecesList[data.player.listIdx])
        data.room.settingsRoom.difficulty.hard = true
        data.room.settingsRoom.difficulty.easy = false




        it("init life with room settings", (done) => {
            client.on("connect", () => {
                client.emit("initialBoard", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (receivedData.player.account.life === 1) done()
                })
            })
        })
        //////////////////////////////
    })


    describe("should test play function", () => {
        const data = {
            player: playerTest, 
            room: roomTest,
            move: "ArrowUp"   
        }
        data.room.inGame = true
        data.room.game.location = "Game"
        data.player.initBoard(data.room.piecesList[data.player.listIdx])

        it("arrowUp move", (done) => {
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (data.player.board && receivedData.player.board.tmpGrid !== data.player.board.tmpGrid) {
                        done()
                    }
                })
            })
        })

        it('Arrow Space', (done) => {
            data.move = " "
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (data.player.board && receivedData.player.board){
                        const {currentPiece} =  receivedData.player.board
                        const dataCurrent  =  data.player.board.currentPiece
                        if (currentPiece.pos.x === dataCurrent.pos.x && currentPiece.pos.y > dataCurrent.pos.y) {
                            done()
                        }
                    }
                })
            })
        })

        it('ArrowDown', (done) => {
            data.move = "ArrowDown"
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (data.player.board && receivedData.player.board){
                        const {currentPiece} =  receivedData.player.board
                        const dataCurrent  =  data.player.board.currentPiece
                        if (currentPiece.pos.x === dataCurrent.pos.x && currentPiece.pos.y > dataCurrent.pos.y ) {
                            done()
                        }
                    }
                })
            })
        })

        it('ArrowLeft', (done) => {
            data.move = "ArrowLeft"
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (data.player.board && receivedData.player.board){
                        const {currentPiece} =  receivedData.player.board
                        const dataCurrent  =  data.player.board.currentPiece
                        if (currentPiece.pos.x < dataCurrent.pos.x && currentPiece.pos.y === dataCurrent.pos.y ) {
                            done()
                        }
                    }
                })
            })
        })

        it('ArrowRight', (done) => {
            data.move = "ArrowRight"
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (data.player.board && receivedData.player.board){
                        const {currentPiece} =  receivedData.player.board
                        const dataCurrent  =  data.player.board.currentPiece
                        if (currentPiece.pos.x > dataCurrent.pos.x && currentPiece.pos.y === dataCurrent.pos.y ) {
                            done()
                        }
                    }
                })
            })
        })

        it('ArrowDown just before save current position', (done) => {
            data.move = "ArrowDown"
            if (data.player.board) {
                data.player.board.currentPiece = new Piece("L", {x: 3, y: 17})
                data.player.board.draw()
            }
            data.player.listIdx = 14
        
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (data.player.board && receivedData.player.board){
                        if (receivedData.player.board.grid !== data.player.board.grid) {
                            done()
                        }
                    }
                })
            })
        }) 

    //     /////////////////////////////////////
    })

    describe("MultiJoueur & clear lines", () => {
        const data = {
            player: new Player("id player1", "name1", "room2") as iPlayer,
            room: new Room("room2"),
            move: ""
        }
        data.move = "ArrowDown"
        data.player.initBoard(data.room.piecesList[data.player.listIdx])
        data.room.addPlayer("id player1", "name1", "room2")
        data.room.addPlayer("id player2", "name2", "room2")
        data.room.players[1].initBoard(data.room.piecesList[data.room.players[1].listIdx])
        rooms.push(data.room)


        it('ArrowDown just before to do lines in Multi', (done) => {
            if (data.player.board) {
                data.player.board.grid = grid
                data.player.board.tmpGrid = grid
                data.player.board.currentPiece = new Piece("I", {x: 7, y: 16})
                data.player.board.draw()
            }
            data.room.updatePlayer(data.player)

            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                })
                client.on("RefreshRoom", (Rdata: any) => {
                    if (data.room.players[1].board && data.room.players[1].board.grid !== Rdata.room.players[1].board.grid) done()
                })
            })
        })

        it('ArrowDown just before GameOver without extra life', (done) => {
            if (data.player.board) {
                data.player.board.grid = gameOverGrid
                data.player.board.tmpGrid = gameOverGrid
                data.player.board.currentPiece = new Piece("I" )
                data.player.board.draw()
            }
            data.player.account.life = 1
            data.room.updatePlayer(data.player)
            
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (receivedData.player.board.gameOver) done()
                })
            })
        })


        it('ArrowDown just before GameOver with extra life', (done) => {
            if (data.player.board) {
                data.player.board.grid = gameOverGrid
                data.player.board.tmpGrid = gameOverGrid
                data.player.board.currentPiece = new Piece("I" )
                data.player.board.draw()
            }
            data.player.account.life = 3
            data.room.updatePlayer(data.player)
            
            client.on("connect", () => {
                client.emit("Board", data)
                client.on("Board", (receivedData: any) => {
                    expect(receivedData.player).toBeDefined()
                    if (receivedData.player.account.life === 2) done()
                })
            })
        })
        ////////////////////////////////////////
    })

    describe("should test resetRoom Function", () => {
        it("reset room", (done) => {
            const data = {
                room: roomTest
            }
            data.room.addPlayer("id player2", "name2", "room1")
            data.room.players[0].listIdx = 10
            client.on('connect', () => {
                data.room.players[0].id = client.id 
                client.emit("ResetRoom", data)
                client.on("ResetPlayer", (Rdata: any) => {
                    console.log('Rdata', Rdata)
                    expect(Rdata).toBeDefined()
                    if (Rdata.player.listIdx === 0) done()
                })
            })
        })
    })
})