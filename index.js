const readline = require("readline");
const hmacKey = require("./hmackey/hmacKey");
const gameRules = require("./rules/rules");
const myGame = require("./game/game");

args = process.argv.slice(2);
const rules = new gameRules();
rules.checkArgs(args);
const game = new myGame(args);
