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
    const fnWin = Array.from({ length: count }, () => "Win");
    const fnLose = Array.from({ length: count }, () => "Lose");
    const data = this.args.reduce((acc, val, index) => {
      if (index == 0) acc[val] = ["Draw", ...fnWin, ...fnLose];
      else if (index <= count) {
        acc[val] = [...fnLose, ...fnWin];
        acc[val].splice(index, 0, "Draw");
      } else {
        acc[val] = [...fnWin, ...fnLose];
        acc[val].splice(index, 0, "Draw");
      }
      return acc;
    }, {});

    let table = this.createSeparator() + "\n";
    table += this.createRow(["v PC  User >", ...this.args]) + "\n";
    table += this.createSeparator() + "\n";

    for (const [key, row] of Object.entries(data)) {
      table += this.createRow([key, ...row]) + "\n";
      table += this.createSeparator() + "\n";
    }
    return console.log(table);
  }

  createRow(rowData) {
    const cells = rowData.map((cell) =>
      cell.toString().padEnd(this.colWidth, " ")
    );
    return `| ${cells.join(" | ")} |`;
  }

  createSeparator() {
    return (
      `+${"-".repeat(this.colWidth + 2)}`.repeat(this.args.length + 1) + `+`
    );
  }
}
module.exports = Help;
