const Player = (name, symbol) => {
    const getName = () => name;

    const getSymbol = () => symbol;


    return {getName, getSymbol};
}


const Gameboard = (() => {
    let gameboard = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const getGameboard = () => gameboard;

    const makeMove = (index, symbol) => {
        if (gameboard[index] === '') {
            gameboard[index] = symbol;
        }
    }

    const resetGameboard = () => {
        gameboard.fill('');
    }


    return {getGameboard, makeMove, resetGameboard};
})();


const DisplayContoller = (() => {
    const cells = document.querySelectorAll('.cell');

    const playerX = Player('placeHolderName', 'X');
    const playerO = Player('placeHolderName', 'O');

    let turn = true;

    const displayMove = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {

                if (turn) {
                    Gameboard.makeMove(index, playerX.getSymbol());
                    cell.textContent = Gameboard.getGameboard()[index];
                } else {
                    Gameboard.makeMove(index, playerO.getSymbol());
                    cell.textContent = Gameboard.getGameboard()[index];
                }

                turn = !turn;

            });
        });
    }
    return {displayMove};
})();


DisplayContoller.displayMove();