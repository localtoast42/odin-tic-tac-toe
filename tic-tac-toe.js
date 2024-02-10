function createPlayer(name, marker) {
    let wins = 0;

    const getWins = () => wins;
    const giveWin = () => wins++;

    return {
        name,
        marker,
        getWins,
        giveWin,
    };
}

function createGameboard() {
    const board = []

    const markTile = (row, col, marker) => {
        let validTile = false;

        if (row < 0 || row > 3 || col < 0 || col > 3 || board[row][col]) {
            console.log('Invalid choice');
        } else  {
            board[row][col] = marker;
            validTile = true;
        };

        return validTile;
    };

    const checkWinCondition = () => {
        const winRows = [];
        const diagOne = [];
        const diagTwo = [];

        for (i = 0; i < 3; i++) {
            winRows.push(board[i]);
            winRows.push(board.map((x) => x[i]));
            diagOne.push(board[i][i]);
            diagTwo.push(board[2 - i][i]);
        };
        winRows.push(diagOne);
        winRows.push(diagTwo);

        for (row of winRows) {
            if (row.every((x) => x === 'X')) {
                return 'X';
            } else if (row.every((x) => x === 'O')) {
                return 'O'
            };
        };
        
        return false;
    };

    const getBoard = () => board;

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            };
        };
    };

    const printBoard = () => {
        for (i = 0; i < 3; i++) {
            console.log(board[i]);
        };
    };

    resetBoard();

    return {
        markTile,
        checkWinCondition,
        getBoard,
        resetBoard,
        printBoard,
    };
}

const game = (function () {
    const board = createGameboard();
    const players = [
        createPlayer('Player One', 'X'),
        createPlayer('Player Two', 'O'),
    ];
    let turn = 0;
    let winner = false;

    const getActivePlayer = () => players[turn % 2];

    const playTurn = (row, col) => {
        if (board.markTile(row, col, getActivePlayer().marker)) {
            turn++;
            winner = board.checkWinCondition();
            if (winner || turn === 9) {
                endGame(winner);
            } else {
                printNewRound();
            };
        };
    };

    const endGame = (winner) => {
        if (winner === 'X') {
            console.log(players[0].name + ' wins! Play again?');
            players[0].giveWin();
        } else if (winner === 'O') {
            console.log(players[1].name + ' wins! Play again?');
            players[1].giveWin();
        } else {
            console.log('Game ends in a tie. Play again?');
        };
    };
    
    const resetGame = () => {
        turn = 0;
        winner = false;
        board.resetBoard();
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    printNewRound();

    return {
        playTurn,
        getActivePlayer,
        resetGame,
        getBoard: board.getBoard,
    };
})();

function ScreenController(game) {
    const boardDiv = document.querySelector('.board');
    const sidebarDiv = document.querySelector('.sidebar');

    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();

        for (row = 0; row < 3; row++) {
            for (col = 0; col < 3; col++) {
                const tileButton = document.createElement('button');
                tileButton.classList.add('tile');
                tileButton.dataset.row = row;
                tileButton.dataset.col = col;
                tileButton.textContent = board[row][col];
                boardDiv.appendChild(tileButton);
            }
        }
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedCol = e.target.dataset.col;
        game.playTurn(selectedRow, selectedCol);
        updateScreen();
    }

    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
}

ScreenController(game);