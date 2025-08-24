const gameContainer = document.getElementById('game');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let cells = [];
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]        
];
const winDescriptions = {
  "0,1,2": "Top Row",
  "3,4,5": "Middle Row",
  "6,7,8": "Bottom Row",
  "0,3,6": "Left Column",
  "1,4,7": "Middle Column",
  "2,5,8": "Right Column",
  "0,4,8": "Diagonal Top-Left to Bottom-Right",
  "2,4,6": "Diagonal Top-Right to Bottom-Left"
};
function createBoard() {
  gameContainer.innerHTML = '';
  cells = [];
board.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    cells.push(cell);
    gameContainer.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
const winInfo = checkWinner();
  if (winInfo) {
    const [a, b, c] = winInfo.pattern;
    cells[a].classList.add('win');
    cells[b].classList.add('win');
    cells[c].classList.add('win');
    statusText.textContent = `Player ${currentPlayer} Wins! (${winDescriptions[winInfo.pattern.toString()]})`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    statusText.textContent = `It's a Draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { pattern };
    }
  }
  return null;
}

restartBtn.addEventListener('click', () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player X's Turn`;
  createBoard();
});

createBoard();