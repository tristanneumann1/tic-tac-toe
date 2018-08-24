const fs = require('fs');
const path = require('path');

if(process.argv.length === 2) {
  const board = [
    ['   ', '   ', '   '],
    ['   ', '   ', '   '],
    ['   ', '   ', '   ']
  ];
  console.log('WELCOME TO MY TIC TAC TOE');
  writeBoard(board, (err, data) => {
     if(err) {
       console.error(err);
      } else {
        console.log('\n BOARD INITIALISED,\n Player 1, make your move\n');
        logBoard(board);
      }
  });
} else {
  fs.readFile(
    path.join(__dirname, '/board.json'),
    (err, boardData) => {
      const board = JSON.parse(boardData);
      move(process.argv[2], process.argv[3], ' X ', board);
      logBoard(board);
    }
  )
}

function logBoard(board) {
  console.log(`_______________\n| ${board[0]} |\n| ${board[1]} |\n| ${board[2]} |\n|_____________|\n`);
}

function move(i, j, player, board) {
  board[i][j] = player;
  writeBoard(board, (err) => {
    if(err) { console.error(err); }
  });
  // checkRow(i);
  // checkColumn(j);
  // checkDiag();
}

function writeBoard(board, cb) {
  fs.writeFile(path.join(__dirname, '/board.json'), JSON.stringify(board), cb);
}