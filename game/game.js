const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
class Game {
  constructor(moves) {
    if (Game.instance) {
      return Game.instance;
    }
    Game.instance = this;
    this.moves = moves;
  }

  getComputerMove() {
    const index = Math.floor(Math.random() * this.moves.length);
    return this.moves[index];
  }

  getUserMove(callback) {
    rl.question("Enter your move: ", (index) => {
      if (index == 0) {
        console.log("Bye! Come back soon!");
        rl.close();
      } else if (index == "?") callback(index);
      else callback(this.moves[index - 1]);
    });
  }
  getResult(userMove, computerMove, checkFn) {
    const indexUser = this.moves.indexOf(computerMove);
    const lastMoves = this.moves
      .slice(indexUser + 1)
      .concat(this.moves.slice(0, indexUser));
    const halfMoves = lastMoves.length / 2;
    const firstHalf = lastMoves.slice(0, halfMoves);
    const secondHalf = lastMoves.slice(halfMoves);
    checkFn(firstHalf, secondHalf, userMove);
  }
}

module.exports = Game;
