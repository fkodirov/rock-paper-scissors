class Rules {
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
}
module.exports = Rules;
