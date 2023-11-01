import { Player } from "./player";
import { PlayerName } from "./types";

const STARTING_VALUE_DENISSE = 9738;
const STARTING_VALUE_CONIE = 10080;

const STARTING_POSITION_DENISSE = 0;
const STARTING_POSITION_CONIE = 0;

let numberOfTurns = 0;
let playerDenisse = new Player(
  PlayerName.Denisse,
  STARTING_POSITION_DENISSE,
  STARTING_VALUE_DENISSE,
  true
);
let playerConie = new Player(
  PlayerName.Conie,
  STARTING_POSITION_CONIE,
  STARTING_VALUE_CONIE
);

let player;
let opponent;

while (playerDenisse.balance > 0 && playerConie.balance > 0) {
  player = playerDenisse.isTurn ? playerDenisse : playerConie;
  opponent = playerDenisse.isTurn ? playerConie : playerDenisse;
  player.play(opponent);
  player.isTurn = false;
  opponent.isTurn = true;

  numberOfTurns++;
  console.log(numberOfTurns);
  console.log("Denisse: ", playerDenisse.balance);
  console.log("Conie: ", playerConie.balance);
}

console.log("Number of turns: ", numberOfTurns);
