const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor(height) {
    this.height = height;
    const arr = new Array;
    for (let i=0; i<height; i++) {
      arr[i] = height - i;
    }
    this.towers = [arr, [], []];
  }

  promptMove() {
    reader.question("Enter the number of the starting tower\n", (start) => {
      reader.question("Enter the number of the ending tower\n", (end) => {
        start = parseInt(start);
        end = parseInt(end);
        if (this.isValidMove(start, end)) {
          this.makeMove(start, end);
          if (!this.isWon()) {
            this.promptMove();
          } else {
            this.gameOver();
          }
        } else {
          this.promptMove();
        }
      });
    });
  }

  makeMove(start, end) {
    this.towers[end].push(this.towers[start].pop());
    this.show();
    return true;
  }

  show() {
    for (let i=0; i<this.towers.length; i++) {
      console.log(`Tower ${i}: ${this.towers[i]}`);
    }
  }

  isValidMove(start, end) {
    if (this.towers[start].length === 0) {
      return false;
    } else if (this.towers[end].length === 0) {
      return true;
    } else {
      return this.towers[start][this.towers[start].length - 1] <
        this.towers[end][this.towers[end].length - 1];
    }
  }

  isWon() {
    return this.towers[0].length === 0 &&
      (this.towers[1].length === 0 || this.towers[2].length === 0);
  }

  gameOver() {
    this.show();
    console.log("You Win!");
    reader.question("Do you want to play again?", (res) => {
      if (res.toLowerCase() === 'yes') {
        this.resetGame();
        this.show();
        this.promptMove();
      } else {
        reader.close();
      }
    });
  }

  resetGame() {
    let arr = [];
    for (let i=0; i<this.height; i++) {
      arr[i] = this.height - i;
    }
    this.towers = [arr, [], []];
  }

  run() {
    this.show();
    this.promptMove();
  }
}

const game = new Game(3);
game.run();
