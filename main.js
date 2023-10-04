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
        }
    };

    return {getGameboard, addMark};
})();


const displayController = (() => {
    const cells = document.querySelectorAll('.cell');

    // const render = () => {
    //     cells.forEach((cell, index) => {
    //         cell.textContent = Gameboard.getGameboard()[index];
    //     });
    // };
    
    const placeMark = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                Gameboard.addMark(index, gameController.getCurrentPlayer().getMark());
                cell.textContent = Gameboard.getGameboard()[index];
                // render();
                gameController.switchPlayer();
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
    
    let currentPlayer = playerX;

    const getCurrentPlayer = () => currentPlayer;

    displayController.placeMark();
    
    const switchPlayer = () => currentPlayer = currentPlayer === playerX ? playerO : playerX;

    return {
      getCurrentPlayer,
      switchPlayer  
    };
})();