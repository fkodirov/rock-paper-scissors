class Rules {
  constructor() {
    if (Rules.instance) {
      return Rules.instance;
    }
    Rules.instance = this;
  }
  checkArgs(args) {
    if (
      args.length < 3 ||
      args.length % 2 === 0 ||
      new Set(args).size !== args.length
    ) {
      console.error(
        "Error: You must pass an odd number of unique moves (at least 3)."
      );
      process.exit(1);
    }
  }
  checkMove(move) {
    if (move === undefined) {
      console.log("Invalid input. Please try again.\n");
      return false;
    }
    return true;
  }
  checkResult(moves1, moves2, userMove) {
    if (moves1.includes(userMove)) return console.log("You win!");
    else if (moves2.includes(userMove)) return console.log("You lose!");
    else return console.log("Draw!");
  }
}
module.exports = Rules;
