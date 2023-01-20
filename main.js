const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restart = document.querySelector('#restart');
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

startGame();

function startGame() {
  running = true;
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restart.addEventListener('click', restartGame);
  statusText.textContent = `Turn: ${currentPlayer}`
}

function cellClicked() {
  const cellIndex = this.getAttribute('id');
  if (options[cellIndex] !== '' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Turn: ${currentPlayer}`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningPositions.length; i++) {
    const conditions = winningPositions[i];
    const cellA = options[conditions[0]];
    const cellB = options[conditions[1]];
    const cellC = options[conditions[2]];

    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} has won!`
    running = false;
  } else if (!options.includes('')) {
    statusText.textContent = 'It is a draw!';
    running = false;
  } else {
    changePlayer()
  }
}

function restartGame() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  statusText.textContent = `Turn: ${currentPlayer}`
  running = true;
}