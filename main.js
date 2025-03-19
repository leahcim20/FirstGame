const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
const gameBoard = document.getElementById('game-board');
const status = document.getElementById('status');

// Function to render the board
function renderBoard() {
    gameBoard.innerHTML = ''; // Clear existing cells
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[row][col];
            if (board[row][col] !== '') cell.classList.add('taken');
            cell.addEventListener('click', () => makeMove(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

// Function to check for a win
function checkWin() {
    // Rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) return true;
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) return true;
    }
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) return true;
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) return true;
    return false;
}

// Function to check for a tie
function checkTie() {
    return board.flat().every(cell => cell !== '');
}

// Function to handle a player's move
function makeMove(row, col) {
    if (board[row][col] !== '') return; // Cell already taken
    board[row][col] = currentPlayer;
    renderBoard();

    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        setTimeout(resetGame, 2000);
        return;
    }
    if (checkTie()) {
        status.textContent = "It's a tie!";
        setTimeout(resetGame, 2000);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = '';
        }
    }
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

// Initialize the game
renderBoard();
