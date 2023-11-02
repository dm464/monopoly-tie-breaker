import { Player } from "./player";
import { PlayerName } from "./constants";

const STARTING_VALUE_DENISSE = 9738;
const STARTING_VALUE_CONIE = 10080;
const STARTING_POSITION_DENISSE = 0;
const STARTING_POSITION_CONIE = 0;

let numberOfTurns: number;
let playerDenisse = new Player(PlayerName.Denisse);
let playerConie = new Player(PlayerName.Conie);

let player;
let opponent;

const TOTAL_NUMBER_OF_GAMES = 1000;
let numWinsConie: number = 0;
let numWinsDenisse: number = 0;
let avgTurns: number = 0;
let avgBalance: number = 0;
let winner: Player;

for (let i = 0; i < TOTAL_NUMBER_OF_GAMES; i++) {
  // Reset values
  playerDenisse.currentPosition = STARTING_POSITION_DENISSE;
  playerDenisse.balance = STARTING_VALUE_DENISSE;
  playerDenisse.isTurn = true;
  playerConie.currentPosition = STARTING_POSITION_CONIE;
  playerConie.balance = STARTING_VALUE_CONIE;
  playerConie.isTurn = false;
  numberOfTurns = 0;
  while (playerDenisse.balance > 0 && playerConie.balance > 0) {
    player = playerDenisse.isTurn ? playerDenisse : playerConie;
    opponent = playerDenisse.isTurn ? playerConie : playerDenisse;
    player.play(opponent);
    player.isTurn = false;
    opponent.isTurn = true;
    numberOfTurns++;
  }
  winner = playerDenisse.balance > 0 ? playerDenisse : playerConie;
  if (winner.name === PlayerName.Denisse) {
    numWinsDenisse++;
  } else {
    numWinsConie++;
  }
  avgBalance += winner.balance;
  avgTurns += numberOfTurns;
}

console.log(
  `Denisse won ${numWinsDenisse} times, Conie won ${numWinsConie} times`
);
console.log(`Average balance: ${avgBalance / TOTAL_NUMBER_OF_GAMES}`);
console.log(`Average turns: ${avgTurns / TOTAL_NUMBER_OF_GAMES}`);
