const readline = require("readline");
const hmacKey = require("./hmackey/hmacKey");
const gameRules = require("./rules/rules");
const myGame = require("./game/game");
const gameHelp = require("./help/help");
const startGame = () => {
  const args = process.argv.slice(2);
  const rules = new gameRules();
  rules.checkArgs(args);
  const game = new myGame(args);
  const hmac = new hmacKey();
  const help = new gameHelp(args);
  const key = hmac.generateHMACKey();
  const computerMove = game.getComputerMove();
  const computerHmac = hmac.computeHMAC(computerMove, key);
  console.log(`HMAC: ${computerHmac}`);
  console.log("Available moves:");
  args.forEach((move, index) => console.log(`${index + 1} - ${move}`));
  console.log("0 - exit");
  console.log("? - help");
  game.getUserMove((userMove) => {
    const response = rules.checkMove(userMove);
    if (response === "help") help.generateTable();
    else if (response) {
      console.log(`Your move: ${userMove}`);
      console.log(`Computer move: ${computerMove}`);
      console.log(key);
      game.getResult(userMove, computerMove, rules.checkResult);
      console.log(`HMAC key: ${computerHmac}\n`);
    }
    startGame();
  });
};
startGame();
