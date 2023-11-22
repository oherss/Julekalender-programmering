
const rows = 20;
const cols = 10;
const blockSize = 30;

let gamespeed = 1;
let board = [];
let currentPiece;
let gameOver = false;
let BackButton;

function setup() {
    createCanvas(cols * blockSize, rows * blockSize);
    initializeBoard();
    spawnPiece();
    BackButton = select('#BackButton')
    BackButton.mousePressed(GetTheFuckBack);
}

function draw() {
    background(220);
    if (!gameOver) {
        updateGame();
        drawBoard();
        drawPiece();
    } else {
        showGameOver();
    }
}

function initializeBoard() {
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            board[row][col] = 0;
        }
    }
}

function spawnPiece() {
    currentPiece = new Piece();
}

function updateGame() {
    if (currentPiece.canMoveDown() ) {
        currentPiece.moveDown();
    } else {
        currentPiece.lock();
        if (currentPiece.isGameOver()) {
            gameOver = true;
        } else {
            spawnPiece();
        }
    }
}

function drawBoard() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(col * blockSize, row * blockSize, blockSize, blockSize);
        }
    }
}

function drawPiece() {
    const { x, y, shape } = currentPiece;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] === 1) {
                fill(0);
                rect((col + x) * blockSize, (row + y) * blockSize, blockSize, blockSize);
            }
        }
    }
}

function showGameOver() {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Game Over", width / 2, height / 2);
}

class Piece {
    constructor() {
        this.x = Math.floor(cols / 2) - 1;
        this.y = 0;
        this.shape = this.getRandomShape();
    }

    getRandomShape() {
        const shapes = [
            [[1, 1], [1, 1]], // Square
            [[1, 1, 1, 1]], // Line
            [[1, 1, 1], [0, 1, 0]], // T-shape
            [[1, 1, 0], [0, 1, 1]], // Z-shape
            [[0, 1, 1], [1, 1, 0]], // S-shape
            [[1, 1, 1], [0, 0, 1]], // L-shape
            [[1, 1, 1], [1, 0, 0]] // J-shape
        ];
        const randomIndex = Math.floor(Math.random() * shapes.length);
        return shapes[randomIndex];
    }

    canMoveDown() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    const nextRow = this.y + row + 1;
                    if (nextRow >= rows || board[nextRow][this.x + col] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    moveDown() {
        this.y++;
    }

    lock() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    board[this.y + row][this.x + col] = 1;
                }
            }
        }
    }

    isGameOver() {
        for (let col = 0; col < cols; col++) {
            if (board[0][col] === 1) {
                return true;
            }
        }
        return false;
    }
}

function keyPressed() {
    if (!gameOver) {
        if (keyCode === LEFT_ARROW) {
            currentPiece.moveLeft();
        } else if (keyCode === RIGHT_ARROW) {
            currentPiece.moveRight();
        } else if (keyCode === DOWN_ARROW) {
            currentPiece.moveDown();
        } else if (keyCode === UP_ARROW) {
            currentPiece.rotate();
        }
    }
}
