import { Player, iPlayer } from "./Player";
import { randomizer } from '../../server/utils/randomizer';
import { iGame, Game } from './Game';


export interface iSettings {
  mode: {
    multiplayer: boolean,
    solo: boolean
  },
  difficulty: {
    easy: boolean;
    hard: boolean;
  },
  options: {
    noRotation: boolean;
    faster: boolean;
  },
  spectrum: boolean
}

const initialSettings: iSettings = {
  mode: {
    multiplayer: false,
    solo: true
  },
  difficulty: {
    easy: true,
    hard: false
  },
  options: {
    noRotation: false,
    faster: false
  },
  spectrum: true
};


export interface iRoom {
  id: string;
  players: iPlayer[];
  inGame: boolean;
  star: iPlayer;
  piecesList: any;
  speed: number;
  settingsRoom : iSettings;
  malus: number;
  game: iGame;
  generator: () => void;
  addPlayer: (playerId: string, playerName: string, playerRoom: string) => void
  startGame: () => void;
  isFull: () => boolean;
  removePlayer: (playerId: string, rooms: iRoom[]) => iRoom[];
  updatePlayer: (updatedPlayer: iPlayer) => void;
  endGame: () => void;
  // resetRoom: () => void
}



export class Room implements iRoom {
  id: string;
  players: iPlayer[];
  inGame: boolean;
  star: iPlayer;
  piecesList: any;
  speed: number;
  settingsRoom : iSettings;
  malus: number;
  game: iGame;


  constructor(id: string) {
    this.id = id;
    this.players = [];
    this.inGame = false;
    this.star = this.players[0];
    this.piecesList = [];
    this.piecesList = this.generator();
    this.speed = 1000;
    this.settingsRoom = initialSettings;
    this.malus = 0;
    this.game = new Game()
  }

  public generator = () => {
    let random = randomizer()
    for(let i = 0; i < 15; i++) {
      this.piecesList.push(random.next().value)
    }
    return this.piecesList
  }

  public addPlayer(playerId: string, playerName: string, playerRoom: string) {
    let player: iPlayer = new Player(playerId, playerName, playerRoom)
    player.initBoard(this.piecesList[player.listIdx])
    this.players.push(player);
    !this.star ? (this.star = player) : (this.star = this.players[0]);
  }

  public startGame() {
    this.inGame = true;
  }

  public isFull() {
    return this.players.length > 3 ? true : false;
  }

  public removePlayer(playerId: string, rooms: iRoom[]) {
    this.players = this.players.filter((player) => player.id !== playerId);
    this.players.length >= 1
      ? (this.star = this.players[0])
      : (rooms = rooms.filter((room) => room.id !== this.id));
    return rooms;
  }

  public updatePlayer(updatedPlayer: iPlayer) {
    this.players = this.players.map((player) => {
      if (player.id === updatedPlayer.id) {
        return updatedPlayer;
      } else {
        return player;
      }
    });
  }

  public endGame() {
    this.inGame = false;
  }

  // public resetRoom() {
  //   this.inGame = false;
  //   this.piecesList = [];
  //   this.piecesList = this.generator();
  //   this.speed = 1000;
  //   this.settingsRoom = initialSettings;
  //   this.malus = 0;
  //   this.game.location = "Room"

  // }
}
