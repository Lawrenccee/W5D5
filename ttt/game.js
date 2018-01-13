const Board = require("./board");

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.board = new Board();
    this.previousPlayer = "O";
    this.currentPlayer = "X";
  }

  promptMove(completionCallback) {
    if (!this.board.isWon()) {
      this.board.show();

      reader.question(`${this.currentPlayer}, ` +
        `where do you want to place a tile? row:\n`, (row) => {
        reader.question(`col:\n`, (col) => {
          row = parseInt(row);
          col = parseInt(col);

          if (this.board.isValidMove(row, col)) {
            this.board.placeTile(this.currentPlayer, row, col);
            [this.previousPlayer, this.currentPlayer] =
              [this.currentPlayer, this.previousPlayer];
            this.promptMove(completionCallback);
          } else {
            console.log("Not a valid move. Try again!");
            this.promptMove(completionCallback);
          }

        });
      });
    } else {
      this.board.show();
      console.log(`${this.board.isWon()}`);
      completionCallback();
    }
  }

  run(completionCallback) {
    this.promptMove(completionCallback);
  }
}

module.exports =  {Game, reader};
