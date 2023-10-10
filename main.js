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

    const resetGameboard = () => {
        gameboard.fill('');
        console.log(gameboard);
    };

    return {getGameboard, addMark, resetGameboard};
})();


const displayController = (() => {
    const gameboard = document.querySelector('.gameboard');
    const cells = document.querySelectorAll('.cell');

    const inputContainer = document.querySelector('.input-container');
    const playerX = document.querySelector('#player-x');
    const playerO = document.querySelector('#player-o');
    const play = document.querySelector('#play');

    const caster = document.querySelector('#caster');
    const playAgain = document.querySelector('#play-again');
    
    let playerXName;
    let playerOName;

    play.addEventListener('click', () => {
        playerXName = playerX.value;
        playerOName = playerO.value;
        gameController.setPlayersName(playerXName, playerOName);
        gameboard.style.display = 'grid';
        inputContainer.style.display = 'none';
    });

    const placeMark = () => {
        cells.forEach((cell, index) => {
            handleEventListener(cell, index);
        });
    };
    
    function handleEventListener(cell, index) {
        cell.addEventListener('click', () => {
            if (!gameController.isGameOver()) {
                Gameboard.addMark(index, gameController.getCurrentPlayer().getMark());
                cell.textContent = Gameboard.getGameboard()[index];
                displaycaster();
            }
        });
    };
    
    function displaycaster() {
        if (gameController.getResult() === undefined) {
            caster.textContent = `${gameController.getCurrentPlayer().getName()}'s turn`;
        } else {
            caster.textContent =  gameController.getResult();
        }
    };
    
    const renderReset = () => {
        cells.forEach((cell) => {
            cell.textContent = '';
        });
    };

    playAgain.addEventListener('click', () => {
        Gameboard.resetGameboard();
        caster.textContent = '';
        renderReset();
        gameController.resetGame();
    });


    return {placeMark};
})();


const Player = (name, mark) => {
    let playerName = name;
    const getName = () => playerName;
    const getMark = () => mark;
    const setName = (name) => {
        playerName = name;
    };
    return {getName, getMark, setName};
};


const gameController = (() => {
    const playerX = Player('', 'x');
    const playerO = Player('', 'o');

    const setPlayersName = (playerXName, playerOName) => {
        playerX.setName(playerXName);
        playerO.setName(playerOName);
    };

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

    const resetGame = () => {
        playerXMoves = [];
        playerOMoves = [];
        currentPlayer = playerX;
        gameOver = false;
    };

    displayController.placeMark();

    return {setPlayersName, getCurrentPlayer, switchPlayer, getResult, isGameOver, resetGame};
})();