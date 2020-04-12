import { Board, iBoard } from './Board';

interface iAccount {
  lines: number;
  points: number;
  life: number
}

const initialAccount = {
  lines: 0,
  points: 0,
  life: 3
}


export interface iPlayer {
  id: string;
  name: string;
  room: string;
  board?: iBoard;
  listIdx: number;
  account: iAccount;
  initBoard: (letter: string) => void  
}

export class Player implements iPlayer {
  id: string;
  name: string;
  room: string;
  board?: iBoard;
  listIdx: number;
  account: iAccount;

  constructor(id: string, name: string, room: string) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.listIdx = 0
    this.account = initialAccount;
  }

  public initBoard(letter: string) {
    this.board = new Board(letter)
    this.board.draw()
  }
}
