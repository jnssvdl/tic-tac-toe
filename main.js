const Gameboard = (() => {
    let gameboard = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const getGameboard = () => gameboard;

    const addMark = (index, mark) => {
        if (gameboard[index] === '') {
            gameboard[index] = mark;
            gameController.switchPlayer(index);
        }
    };

    return {getGameboard, addMark};
})();


const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const state = document.querySelector('#state');
    
    const placeMark = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (!gameController.isGameOver()) {
                    Gameboard.addMark(index, gameController.getCurrentPlayer().getMark());
                    cell.textContent = Gameboard.getGameboard()[index];
                    state.textContent =  gameController.getResult();
                }
            });
        });
    };

    return {placeMark};
})();


const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
};


const gameController = (() => {
    const playerX = Player('brandon', 'x');
    const playerO = Player('daniel', 'o');
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let playerXMoves = [];
    let playerOMoves = [];

    let currentPlayer = playerX;

    let gameOver = false;

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = (move) => {
        if (currentPlayer === playerX) {
            playerXMoves.push(move);
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
            playerOMoves.push(move);
        }
    };

    function isDraw() {
        return Gameboard.getGameboard().every(cell => cell !== '');
    };

    const getResult = () => {
        for (let winningCondition of winningConditions) {
            if (winningCondition.every((i) => playerXMoves.includes(i))) {
                gameOver = true;
                return `${playerX.getName()} wins`;
            }
            if (winningCondition.every((i) => playerOMoves.includes(i))) {
                gameOver = true;
                return `${playerO.getName()} wins`;
            }
        }
    
        if (isDraw()) {
            gameOver = true;
            return 'draw';
        }
    };

    const isGameOver = () => {
        return gameOver;
    };

    displayController.placeMark();

    return {getCurrentPlayer, switchPlayer, getResult, isGameOver};
})();