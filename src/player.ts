import {
  didPassGo,
  getNewPosition,
  goToNextCommunityChestOrChance,
  roll,
} from "./utils";
import {
  DOUBLE_ROLLS_JAIL,
  AMOUNT_GO,
  AMOUNT_INCOME_TAX,
  AMOUNT_LUXUTY_TAX,
  AMOUNT_OUT_OF_JAIL,
  OWNED_PROPERTIES_CONIE,
  OWNED_PROPERTIES_DENISSE,
  PlayerName,
  Position,
  PROPERTY_RENT,
  POSITIONS_CHANCE,
  TOTAL_CARDS_CHANCE,
} from "./constants";

export class Player {
  private consecutiveDoubles = 0;
  private doubleAttempts = 0;
  private chanceIdx = 0;
  private communityChestIdx = 0;

  constructor(
    public name: PlayerName,
    public currentPosition: number = 0,
    public balance: number = 0,
    public isJailed: boolean = false,
    public isTurn: boolean = false
  ) {
    this.name = name;
    this.currentPosition = currentPosition;
    this.balance = balance;
    this.isJailed = isJailed;
    this.isTurn = isTurn;
  }

  private updateFromPosition(opposingPlayer: Player) {
    switch (this.currentPosition) {
      case Position.Go:
        this.balance += AMOUNT_GO;
        break;
      case Position.IncomeTax:
        this.balance -= AMOUNT_INCOME_TAX;
        break;
      case Position.HighestProperty:
        // These values are hard-coded based on the current state of the game
        // This also brings Conie to New Jersey which is the last property, but
        // it could very well be New York Avenue
        // FIXME: Make this more dynamic
        if (this.name === PlayerName.Denisse) {
          this.updatePosition(Position.Boardwalk);
        } else {
          this.updatePosition(Position.NewJerseyAvenue);
        }
        break;
      case Position.GoToJail:
        this.goToJail();
        break;
      case Position.Take100:
        this.balance += 100;
        break;
      case Position.LuxuryTax:
        this.balance -= AMOUNT_LUXUTY_TAX;
        break;
    }

    if (
      (this.name === PlayerName.Denisse &&
        OWNED_PROPERTIES_CONIE.includes(this.currentPosition)) ||
      (this.name === PlayerName.Conie &&
        OWNED_PROPERTIES_DENISSE.includes(this.currentPosition))
    ) {
      this.balance -= PROPERTY_RENT[this.currentPosition];
      opposingPlayer.balance += PROPERTY_RENT[this.currentPosition];
    }

    // TODO: Adjust balances based on community chest or change card;
    if (POSITIONS_CHANCE.includes(this.currentPosition)) {
      this.pickChance(opposingPlayer);
    }
  }

  play(opponent: Player) {
    const { total, monopolyMan, bus, isTriple, isDouble } = roll();
    const newPosition = getNewPosition(this.currentPosition, total);

    // Strategy: If you roll a triple, go to jail (no collecting $200)
    // TODO: Ensure that there is no contradiction with double & triples
    if (!isDouble) {
      this.consecutiveDoubles = 0;
      if (this.isJailed) {
        this.doubleAttempts++;
        if (this.doubleAttempts === DOUBLE_ROLLS_JAIL) {
          this.balance -= AMOUNT_OUT_OF_JAIL;
          this.isJailed = false;
          this.doubleAttempts = 0;
        } else {
          return;
        }
      }
    }
    if (isDouble) {
      this.handleDouble(newPosition);
    } else if (isTriple) {
      this.goToJail();
      this.consecutiveDoubles = 0;
    } else {
      this.updatePosition(newPosition);
      this.consecutiveDoubles = 0;
    }

    this.updateFromPosition(opponent);

    if (monopolyMan) {
      this.updatePosition(this.getMonopolyManPosition());
      this.updateFromPosition(opponent);
    }
    if (bus) {
      this.updatePosition(goToNextCommunityChestOrChance(newPosition));
      this.updateFromPosition(opponent);
    }
  }

  private handleDouble(newPosition: number) {
    if (this.isJailed) {
      this.isJailed = false;
      this.updatePosition(newPosition, false);
    } else {
      this.consecutiveDoubles++;
      if (this.consecutiveDoubles === DOUBLE_ROLLS_JAIL) {
        this.goToJail();
        this.consecutiveDoubles = 0;
      } else {
        this.updatePosition(newPosition);
      }
    }
  }

  private getMonopolyManPosition(): number {
    if (this.name === PlayerName.Denisse) {
      return (
        OWNED_PROPERTIES_CONIE.find(
          (position) => position > this.currentPosition
        ) || Position.ParkPlace
      );
    } else {
      return (
        OWNED_PROPERTIES_DENISSE.find(
          (position) => position > this.currentPosition
        ) || Position.SaintJamesPlace
      );
    }
  }

  private goToJail() {
    this.updatePosition(Position.Jail, false);
    this.isJailed = true;
  }

  private pickChance(opponent: Player) {
    switch (this.chanceIdx) {
      // Go to jail
      case 0:
        this.goToJail();
        break;
      // Go to St. Charles Place
      case 1:
        this.updatePosition(Position.SaintCharlesPlae);
        break;
      // Go back 3 spaces
      case 2:
        // Making collectMoneyOnGo false will prevent the player from collecting
        // since the new smaller index will incorrectly return true for the passedGo logic
        this.updatePosition(this.currentPosition - 3, false);
        this.updateFromPosition(opponent);
        break;
    }
    this.chanceIdx = (this.chanceIdx + 1) % TOTAL_CARDS_CHANCE;
  }

  private updatePosition(
    newPosition: number,
    collectMoneyOnGo: boolean = true
  ) {
    if (didPassGo(this.currentPosition, newPosition) && collectMoneyOnGo) {
      this.balance += AMOUNT_GO;
    }
    this.currentPosition = newPosition;
  }
}
