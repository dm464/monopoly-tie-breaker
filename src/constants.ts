export enum Position {
  Go = 0,
  IncomeTax = 5,
  Jail = 13,
  HighestProperty = 14,
  SaintCharlesPlae = 16,
  SaintJamesPlace = 21,
  TennesseeAvenue = 23,
  NewYorkAvenue = 24,
  NewJerseyAvenue = 25,
  FreeParking = 26,
  GoToJail = 39,
  Take100 = 47,
  ParkPlace = 49,
  LuxuryTax = 50,
  Boardwalk = 51,
}

export enum PlayerName {
  Conie,
  Denisse,
}

export const AMOUNT_GO = 0;
export const AMOUNT_INCOME_TAX = 200;
export const AMOUNT_LUXUTY_TAX = 100;
export const AMOUNT_OUT_OF_JAIL = 50;
export const DOUBLE_ROLLS_JAIL = 3;
export const POSITIONS_CHANCE = [9, 28, 46];
export const POSITIONS_COMMUNITY_CHEST = [2, 22, 43];
export const POSITIONS_TOTAL = 52;
export const TOTAL_CARDS_CHANCE = 15;
export const TOTAL_CARDS_COMMUNITY_CHEST = 15;

export const OWNED_PROPERTIES_DENISSE = [
  Position.SaintJamesPlace,
  Position.TennesseeAvenue,
  Position.NewYorkAvenue,
  Position.NewJerseyAvenue,
];

export const OWNED_PROPERTIES_CONIE = [Position.ParkPlace, Position.Boardwalk];

export const PROPERTY_RENT = {
  [Position.SaintJamesPlace]: 1450,
  [Position.TennesseeAvenue]: 1450,
  [Position.NewYorkAvenue]: 1500,
  [Position.NewJerseyAvenue]: 1500,
  [Position.ParkPlace]: 1500,
  [Position.Boardwalk]: 2000,
};
