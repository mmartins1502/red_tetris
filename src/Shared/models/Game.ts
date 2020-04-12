export interface iGame {
    location: string;
}

export class Game implements iGame {
    location: string;

    constructor() {
        this.location = "room"
    }
}