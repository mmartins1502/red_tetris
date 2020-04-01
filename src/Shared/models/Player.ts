import { Board, iBoard } from './Board';

interface iAccount {
  lines: number;
  points: number;
}

export interface iPlayer {
  id: string;
  name: string;
  room: string;
  state: boolean;
  board?: iBoard;
  listIdx: number;
  account: iAccount;
  initBoard: (letter: string) => void  
}

export class Player implements iPlayer {
  id: string;
  name: string;
  room: string;
  state: boolean;
  board?: iBoard;
  listIdx: number;
  account: iAccount;

  constructor(id: string, name: string, room: string) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.state = false;
    this.listIdx = 0
    this.account = {
      lines: 0,
      points: 0
    }
  }

  public initBoard(letter: string) {
    this.board = new Board(letter)
    this.board.draw()
  }
}
