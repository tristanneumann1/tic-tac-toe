const fs = require('fs');
const path = require('path');

if(process.argv.length === 2) {
  const board = [
    ['   ', '   ', '   '],
    ['   ', '   ', '   '],
    ['   ', '   ', '   ']
  ];
  console.log('WELCOME TO MY TIC TAC TOE');
  writeBoard(board, ' X ', (err, data) => {
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
    (err, gameData) => {
      const game = JSON.parse(gameData);
      move(process.argv[2], process.argv[3], game.player, game.board);
      logBoard(game.board);
    }
  )
}

function logBoard(board) {
  console.log(`_______________\n| ${board[0]} |\n| ${board[1]} |\n| ${board[2]} |\n|_____________|\n`);
}

function move(i, j, player, board) {
  board[i][j] = player;
  writeBoard(board, swapPlayer(player), (err) => {
    if(err) { console.error(err); }
  });
  // checkRow(i);
  // checkColumn(j);
  // checkDiag();
}

function writeBoard(board, player, cb) {
  fs.writeFile(path.join(__dirname, '/board.json'), JSON.stringify({
    board: board,
    player: player,
  }), cb);
}

function swapPlayer(player) {
  return (player === ' X ') ? ' O ' : ' X ';
}