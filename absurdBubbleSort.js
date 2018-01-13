const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

function absurdBubbleSort(arr, sortCompletionCallback) {

  function outerBubbleSortLoop(anySwaps = true) {
    if (anySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
      reader.close();
    }
  }
  outerBubbleSortLoop();
}

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} > ${el2}?\n`, (answer) => {
    if (answer.toLowerCase() === 'yes') {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan) => {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

// askIfGreaterThan(1, 2, (bool) => {
//   console.log(bool);
// });
const arr = [4,2,1,6,3];
// innerBubbleSortLoop(arr, 0, false, (madeAnySwaps) => {
//   console.log(`${arr} ${madeAnySwaps}`);
// });

absurdBubbleSort(arr, (arr2) => {
  console.log(arr2);
});
