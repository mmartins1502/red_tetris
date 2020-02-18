import { Player } from "./Player";

export type Room = {
  id: string;
  players: Player[];
  inGame: boolean;
  star: Player;
};
