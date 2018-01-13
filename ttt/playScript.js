const {Game, reader} = require("./game");

// const readline = require('readline');
//
// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function completionCallback() {
  reader.question("Do you want to play again?\n", (res) => {
    if (res.toLowerCase() === 'yes') {
      const game = new Game();
      game.run(completionCallback);
    } else {
      reader.close();
    }
  });
}

const game = new Game();
game.run(completionCallback);
