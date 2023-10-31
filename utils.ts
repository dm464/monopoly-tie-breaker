const COMMUNITY_CHEST_POSITIONS = [2, 22, 43];
const CHANCE_POSITIONS = [9, 28, 46];
const TOTAL_POSITIONS = 52;
const GO_AMOUNT = 200;
const INCOME_TAX_AMOUNT = 200;
const LUXUTY_TAX_AMOUNT = 100;

const dieRoll = () => {
  return Math.random() * 6 + 1;
};

const roll = (): Roll => {
  const die1 = dieRoll();
  const die2 = dieRoll();
  const die3 = dieRoll();

  // For die3, 1-3 will give the actual number
  // 4 - 5 refers to monopoly man, and 6 refers to the bus
  const monopolyMan: boolean = die3 > 3 && die3 < 6;
  const bus: boolean = die3 > 5;
  const total = die1 + die2 + (die3 < 4 ? die3 : 0);
  return { total, monopolyMan, bus };
};

const getNewPosition = (currentPosition: number, rollTotal: number) => {
  const newPosition = currentPosition + (rollTotal % TOTAL_POSITIONS);
  const passedGo: boolean = newPosition < currentPosition;
  return { newPosition, passedGo };
};

const goToNextCommunityChestOrChance = (currentPosition: number): number => {
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
