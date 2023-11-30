
const rows = 10;
const cols = 10;
const totalMines = 10;

let board = [];

function setup() {
  createCanvas(400, 400);
  initializeBoard();
  placeMines();
  calculateNumbers();
}

function initializeBoard() {
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i][j] = {
        isMine: false,
        isRevealed: false,
        number: 0
      };
    }
  }
}

function placeMines() {
  let minesPlaced = 0;
  while (minesPlaced < totalMines) {
    const row = floor(random(rows));
    const col = floor(random(cols));
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
}

function calculateNumbers() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j].isMine) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const newRow = i + x;
            const newCol = j + y;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              if (board[newRow][newCol].isMine) {
                count++;
              }
            }
          }
        }
        board[i][j].number = count;
      }
    }
  }
}

function draw() {
  background(220);
  // Draw the board here
}
