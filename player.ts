class Player {
  private consecutiveDoubles = 0;

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
        this.balance += GO_AMOUNT;
        break;
      case Position.IncomeTax:
        this.balance -= INCOME_TAX_AMOUNT;
        break;
      case Position.HighestProperty:
        // TODO: Determine highest property for player
        break;
      case Position.GoToJail:
        this.isJailed = true;
        this.currentPosition = Position.Jail;
        break;
      case Position.Take100:
        this.balance += 100;
        break;
      case Position.LuxuryTax:
        this.balance -= LUXUTY_TAX_AMOUNT;
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
  }

  play(opponent: Player) {
    const { total, monopolyMan, bus, isTriple, isDouble } = roll();

    const { newPosition, passedGo } = getNewPosition(
      this.currentPosition,
      total
    );
    // Strategy: If you roll a triple, go to jail (no collecting $200)
    if (!isDouble) {
      this.consecutiveDoubles = 0;
    }
    if (isDouble) {
      this.handleDouble(newPosition);
    } else if (isTriple) {
      this.currentPosition = Position.GoToJail;
      this.consecutiveDoubles = 0;
    } else {
      this.currentPosition = newPosition;
      this.consecutiveDoubles = 0;
    }

    if (passedGo) {
      this.balance += GO_AMOUNT;
    }
    this.updateFromPosition(opponent);

    if (monopolyMan) {
      this.currentPosition = this.getMonopolyManPosition();
      this.updateFromPosition(opponent);
    }
    if (bus) {
      this.currentPosition = goToNextCommunityChestOrChance(newPosition);
      this.updateFromPosition(opponent);
    }
  }

  private handleDouble(newPosition: number) {
    if (this.isJailed) {
      this.isJailed = false;
      this.currentPosition = newPosition;
      // TODO: limit to 3 attempts
    } else {
      this.consecutiveDoubles++;
      if (this.consecutiveDoubles === DOUBLE_ROLLS_JAIL) {
        this.currentPosition = Position.GoToJail;
        this.consecutiveDoubles = 0;
      } else {
        this.currentPosition = newPosition;
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
}
