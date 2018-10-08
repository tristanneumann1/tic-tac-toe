const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

const moves = {
  7: [0, 0],
  8: [0, 1],
  9: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  1: [2, 0],
  2: [2, 1],
  3: [2, 2],
};

// Helper Functions

function checkRow(board, i) {
  if (board[i][0] !== '   ' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
    return true;
  }
  return false;
}

function checkColumn(board, j) {
  if (board[0][j] !== '   ' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
    return true;
  }
  return false;
}

function checkDiag(board) {
  if (board[0][0] !== '   ' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== '   ' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return true;
  }
  return false;
}

// Gameplay Functions

function initialiseBoard() {
  const board = [
    ['   ', '   ', '   '],
    ['   ', '   ', '   '],
    ['   ', '   ', '   '],
  ];
  console.log(`\n${'='.repeat(150)}\n\nWELCOME TO MY TIC TAC TOE`);
  writeBoard(board, ' X ', 0, (err, gameData) => {
    if (err) {
      console.error(err);
    } else {
      console.log('\n BOARD INITIALISED,\n Player 1, make your move\n');
      logBoard(board, true);
      console.log('Player X begin;\n');
      promptMove();
    }
  });
}

function takeTurn(position) {
  fs.readFile(
    path.join(__dirname, '/board.json'),
    (err, gameData) => {
      const game = JSON.parse(gameData);
      const win = move(...moves[position], game);
      if (win === 1) {
        console.log(`\nPlayer ${game.player} has won!!`);
        logBoard(game.board);
        promptRestart();
      } else if (win === 0) {
        logBoard(game.board);
        console.log(`Player ${game.player}, your move;\n`);
        promptMove();
      } else if (win === -1) {
        console.log('\nIllegal move, please try again:');
        promptMove();
      } else {
        console.log('\n TIE\n');
        promptRestart();
      }
    },
  );
}

function move(i, j, game) {
  if (game.board[i][j] !== '   ') {
    return -1;
  }
  game.board[i][j] = game.player;
  writeBoard(game.board, game.player = swapPlayer(game.player), game.counter + 1, (err) => {
    if (err) { console.error(err); }
  });
  const win = checkRow(game.board, i) || checkColumn(game.board, j) || checkDiag(game.board);
  if (!win && game.counter === 8) {
    return 2;
  }
  return +win;
}

function swapPlayer(player) {
  return (player === ' X ') ? ' O ' : ' X ';
}

function writeBoard(board, player, counter, cb) {
  fs.writeFile(path.join(__dirname, '/board.json'), JSON.stringify({
    board,
    player,
    counter,
  }), cb);
}

function logBoard(board, start) {
  if (start) {
    console.log(`_______________\n| ${[' 7 ', ' 8 ', ' 9 ']} |\n| ${[' 4 ', ' 5 ', ' 6 ']} |\n| ${[' 1 ', ' 2 ', ' 3 ']} |\n|_____________|\n`);
  } else {
    console.log(`_______________\n| ${board[0]} |\n| ${board[1]} |\n| ${board[2]} |\n|_____________|\n`);
  }
}

// Interaction Functions

function promptMove() {
  prompt.start();
  prompt.get(['position'], (err, response) => {
    if (err) {
      console.error(err);
    }
    if (!/^[1-9q]$/.test(response.position)) {
      console.log('\nIllegal move please try again\n');
      promptMove();
    } else if (response.position === 'q') {
      console.log('\n Thanks For playing!!');
    } else {
      takeTurn(response.position);
    }
  });
}

function promptRestart() {
  console.log(' \n Would you like a restart? (y/n)\n');
  prompt.start();
  prompt.get(['restart'], (err, restart) => {
    if (err) {
      console.error(err);
    } else if (restart.restart === 'y') {
      initialiseBoard();
    } else {
      console.log('\nThanks for playing!!');
    }
  });
}

// Start Game:

initialiseBoard();
