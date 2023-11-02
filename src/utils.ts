import { Roll } from "./types";
import {
  POSITIONS_CHANCE,
  POSITIONS_COMMUNITY_CHEST,
  POSITIONS_TOTAL,
} from "./constants";

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
  return (currentPosition + rollTotal) % POSITIONS_TOTAL;
};

export const goToNextCommunityChestOrChance = (
  currentPosition: number
): number => {
  const nextCommunityChest = POSITIONS_COMMUNITY_CHEST.find(
    (position) => position > currentPosition
  );
  const nextChance = POSITIONS_CHANCE.find(
    (position) => position > currentPosition
  );
  if (!nextCommunityChest && !nextChance) {
    return Math.min(...POSITIONS_COMMUNITY_CHEST, ...POSITIONS_CHANCE);
  } else if (nextChance) {
    return nextChance;
  } else if (nextCommunityChest) {
    return nextCommunityChest;
  }
  // This should never happen
  return currentPosition;
};

export const didPassGo = (
  currentPosition: number,
  newPosition: number
): boolean => {
  return newPosition < currentPosition;
};
