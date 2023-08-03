const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
class Game {
  constructor(moves) {
    this.moves = moves;
  }

  getComputerMove() {
    const index = Math.floor(Math.random() * this.moves.length);
    return this.moves[index];
  }

  getUserMove(callback) {
    rl.question("Enter your move: ", (move) => {
      callback(move);
      rl.close();
    });
  }
}

module.exports = Game;
