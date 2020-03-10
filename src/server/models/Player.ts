export class Player {
  id: string;
  name: string;
  room: string;
  state: boolean;

  constructor(id: string, name: string, room: string) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.state = false;
  }
}
