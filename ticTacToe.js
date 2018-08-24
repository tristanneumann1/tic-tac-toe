const fs = require('fs');
const path = require('path');

if(process.argv.length === 2) {
  console.log('WELCOME TO MY TIC TAC TOE');
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  fs.writeFile(path.join(__dirname, '/board.txt'), board)
}
