export interface Roll {
  total: number;
  monopolyMan: boolean;
  bus: boolean;
  isTriple: boolean;
  isDouble: boolean;
}

export enum Position {
  Go = 0,
  IncomeTax = 5,
  Jail = 13,
  HighestProperty = 14,
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

export enum PlayerName {
  Conie,
  Denisse,
}
