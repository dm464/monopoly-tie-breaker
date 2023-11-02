import { Player } from "./player";
import { PlayerName } from "./constants";

const STARTING_VALUE_DENISSE = 9738;
const STARTING_VALUE_CONIE = 10080;
const STARTING_POSITION_DENISSE = 0;
const STARTING_POSITION_CONIE = 0;

let numberOfTurns: number;
let playerDenisse: Player;
let playerConie: Player;
let chanceIdx: number;
let communityChestIdx: number;

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
  playerDenisse = new Player(
    PlayerName.Denisse,
    STARTING_POSITION_DENISSE,
    STARTING_VALUE_DENISSE,
    false
  );
  playerConie = new Player(
    PlayerName.Conie,
    STARTING_POSITION_CONIE,
    STARTING_VALUE_CONIE,
    true
  );
  numberOfTurns = 0;
  chanceIdx = 0;
  communityChestIdx = 0;
  while (playerDenisse.balance > 0 && playerConie.balance > 0) {
    player = playerDenisse.isTurn ? playerDenisse : playerConie;
    opponent = playerDenisse.isTurn ? playerConie : playerDenisse;
    player.play(opponent, chanceIdx, communityChestIdx);
    chanceIdx = player.chanceIdx;
    communityChestIdx = player.communityChestIdx;
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
