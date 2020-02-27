module.exports = class Player {
  constructor(id, name, room) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.state = false;
  }

  setName(name) {
    this.name = name;
    return this.getName();
  }

  getName() {
    return this.name;
  }

  getSocketId() {
    return this.socketId;
  }
};
