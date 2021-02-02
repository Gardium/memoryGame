let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;

      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },
  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }

    return this.firstCard.icon == this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
  stacks: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],
  cards: null,

  createCardsFromStacks: function () {
    this.cards = [];
    for (let stack of this.stacks) {
      this.cards.push(this.createPairFromStack(stack));
    }

    this.cards = this.cards.flatMap((pair) => pair);
    // this.shuffleCards();
    return this.cards;
  },

  createPairFromStack: function (stack) {
    return [
      {
        id: this.createIdWithStack(stack),
        icon: stack,
        flipped: false,
      },
      {
        id: this.createIdWithStack(stack),
        icon: stack,
        flipped: false,
      },
    ];
  },

  createIdWithStack: function (stack) {
    return stack + parseInt(Math.random() * 1000);
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex--;
      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },
  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function () {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },
};
