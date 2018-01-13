class Board {
  constructor() {
    this.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  }

  placeTile(tile, row, col) {
    this.board[row][col] = tile;
  }

  isValidMove(row, col) {
    return this.board[row][col] === " ";
  }

  isX(curValue) {
    return curValue === "X";
  }

  isO(curValue) {
    return curValue === "O";
  }

  isWon() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].every(this.isX.bind(null))) {
        return "X wins!";
      } else if (this.board[i].every(this.isO.bind(null))) {
        return "O wins!";
      } else if (this.board.transpose()[i].every(this.isX.bind(null))) {
        return "X wins!";
      } else if (this.board.transpose()[i].every(this.isO.bind(null))) {
        return "O wins!";
      }
    }
    if (this.downDiagonal().every(this.isX.bind(null)) ||
      this.upDiagonal().every(this.isX.bind(null))) {
      return "X wins!";
    }
    if (this.downDiagonal().every(this.isO.bind(null)) ||
      this.upDiagonal().every(this.isO.bind(null))) {
      return "O wins!";
    }
    if (this.isFull()) {
      return "Cat's game";
    }
    return false;
  }

  isFull() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] === " ") {
          return false;
        }
      }
    }

    return true;
  }

  downDiagonal() {
    return [this.board[0][0], this.board[1][1], this.board[2][2]];
  }

  upDiagonal() {
    return [this.board[2][0], this.board[1][1], this.board[0][2]];
  }

  show() {
    for (let i = 0; i < this.board.length; i ++) {
      console.log(this.board[i]);
    }
  }
}

Array.prototype.transpose = function() {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    const subArr = [];
    for (let j = 0; j < this[i].length; j++) {
      subArr.push(this[j][i]);
    }
    newArr.push(subArr);
  }
  return newArr;
};

module.exports =  Board;
