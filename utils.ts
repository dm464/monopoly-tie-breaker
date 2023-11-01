import { Roll } from "./types";

export const COMMUNITY_CHEST_POSITIONS = [2, 22, 43];
export const CHANCE_POSITIONS = [9, 28, 46];
export const TOTAL_POSITIONS = 52;
export const GO_AMOUNT = 200;
export const INCOME_TAX_AMOUNT = 200;
export const LUXUTY_TAX_AMOUNT = 100;
export const DOUBLE_ROLLS_JAIL = 3;
export const OUT_OF_JAIL_AMOUNT = 50;

const dieRoll = () => {
  return Math.random() * 6 + 1;
};

export const roll = (): Roll => {
  const die1 = dieRoll();
  const die2 = dieRoll();
  const die3 = dieRoll();

  // For die3, 1-3 will give the actual number
  // 4 - 5 refers to monopoly man, and 6 refers to the bus
  const monopolyMan: boolean = die3 > 3 && die3 < 6;
  const bus: boolean = die3 > 5;
  const total = die1 + die2 + (die3 < 4 ? die3 : 0);
  const isTriple = die1 === die2 && die2 === die3;
  const isDouble = die1 === die2 && die2 !== die3;
  return { total, monopolyMan, bus, isTriple, isDouble };
};

export const getNewPosition = (currentPosition: number, rollTotal: number) => {
  const newPosition = currentPosition + (rollTotal % TOTAL_POSITIONS);
  const passedGo: boolean = newPosition < currentPosition;
  return { newPosition, passedGo };
};

export const goToNextCommunityChestOrChance = (
  currentPosition: number
): number => {
  const nextCommunityChest = COMMUNITY_CHEST_POSITIONS.find(
    (position) => position > currentPosition
  );
  const nextChance = CHANCE_POSITIONS.find(
    (position) => position > currentPosition
  );
  if (!nextCommunityChest && !nextChance) {
    return Math.min(...COMMUNITY_CHEST_POSITIONS, ...CHANCE_POSITIONS);
  } else if (nextChance) {
    return nextChance;
  } else if (nextCommunityChest) {
    return nextCommunityChest;
  }
  // This should never happen
  return currentPosition;
};
