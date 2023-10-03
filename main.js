const Player = (name, symbol) => {
    const getName = () => name;

    const getSymbol = () => symbol;


    return {getName, getSymbol};
}


const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

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
    
    const displayMove = (Gameboard, player) => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                Gameboard.makeMove(index, player.getSymbol());
                cell.textContent = Gameboard.getGameboard()[index];
            });
        });
    }

    return {displayMove};
})();


const player1 = Player('joe', 'x');
DisplayContoller.displayMove(Gameboard, player1);
