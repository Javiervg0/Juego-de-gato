let board, currentPlayer, Player1, Player2, gameMode;
const combinacionGanadora = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function InicioJuego() {
    Player1 = document.getElementById('Jugador1').value || 'Jugador 1';
    Player2 = document.getElementById('Jugador2').value || 'Jugador 2';
    gameMode = document.getElementById('gameMode').value; 
    board = Array(9).fill(null);
    currentPlayer = 'X';
    document.getElementById('tablero').classList.remove('hidden');
    document.getElementById('message').classList.add('hidden');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] === null) {
        makeMove(index);
        if (!checkWin(currentPlayer) && !board.every(cell => cell !== null)) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === "1" && currentPlayer === 'O') {
                setTimeout(makeAIMove, 500); 
            }
        }
    }
}

function makeMove(index) {
    board[index] = currentPlayer;
    document.querySelector(`.cell[data-index="${index}"]`).textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (board.every(cell => cell !== null)) {
        endGame(true);
    }
}

function makeAIMove() {
    const emptyCells = board.map((val, idx) => val === null ? idx : null).filter(idx => idx !== null);
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex);
        currentPlayer = 'X'; 
    }
}

function checkWin(player) {
    return combinacionGanadora.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function endGame(draw) {
    const message = document.getElementById('message');
    message.classList.remove('hidden');
    if (draw) {
        message.textContent = '¡Es un empate!';
    } else {
        const ganador = currentPlayer === 'X' ? Player1 : Player2;
        message.textContent = `¡${ganador} ha ganado!`;
    }
}
