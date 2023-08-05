const clc = require("cli-color");
const red = clc.red;
const green = clc.green;
const yellow = clc.yellow;
const bold = clc.bold;
class Help {
  constructor(args) {
    if (Help.instance) {
      return Help.instance;
    }
    this.args = args;
    this.colWidth = 12;
    Help.instance = this;
  }

  generateTable() {
    const count = (this.args.length - 1) / 2;
    const fnWin = Array.from({ length: count }, () => green(this.pad("Win")));
    const fnLose = Array.from({ length: count }, () => red(this.pad("Lose")));
    const data = this.args.reduce((acc, val, index) => {
      if (index == 0)
        acc[val] = [yellow(this.pad("Draw")), ...fnWin, ...fnLose];
      else if (index <= count) {
        acc[val] = [...fnLose, ...fnWin];
        acc[val].splice(index, 0, yellow(this.pad("Draw")));
      } else {
        acc[val] = [...fnWin, ...fnLose];
        acc[val].splice(index, 0, yellow(this.pad("Draw")));
      }
      return acc;
    }, {});

    let table = this.createSeparator() + "\n";
    table +=
      this.createRow([
        "v PC User >",
        ...this.args.map((e) => bold(this.pad(e))),
      ]) + "\n";
    table += this.createSeparator() + "\n";

    for (const [key, row] of Object.entries(data)) {
      table += this.createRow([bold(this.pad(key)), ...row]) + "\n";
      table += this.createSeparator() + "\n";
    }
    return console.log(table);
  }

  createRow(rowData) {
    const cells = rowData.map((cell) => this.pad(cell.toString()));
    return `| ${cells.join(" | ")} |`;
  }

  createSeparator() {
    return (
      `+${"-".repeat(this.colWidth + 2)}`.repeat(this.args.length + 1) + `+`
    );
  }
  pad(e) {
    return e.padEnd(this.colWidth, " ");
  }
}

module.exports = Help;
