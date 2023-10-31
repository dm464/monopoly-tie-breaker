const STARTING_VALUE_DENISSE = 9738;
const STARTING_VALUE_CONIE = 10080;

const STARTING_POSITION_DENISSE = 0;
const STARTING_POSITION_CONIE = 0;

let numberOfTurns = 0;
let positionConie = STARTING_POSITION_CONIE;
let positionDenisse = STARTING_POSITION_DENISSE;
let playerRoll;
let player = 0;

while (STARTING_VALUE_DENISSE > 0 && STARTING_VALUE_CONIE > 0) {
  playerRoll = roll();
  numberOfTurns++;
}
