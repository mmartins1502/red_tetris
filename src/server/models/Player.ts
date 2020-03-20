import { Board } from './Board';

export class Player {
  id: string;
  name: string;
  room: string;
  state: boolean;
  board: Board;
  listIdx: number;

  constructor(id: string, name: string, room: string) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.state = false;
    this.board = new Board()
    this.listIdx = 0
    
  }
}
