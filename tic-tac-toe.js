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

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = 0;
        };
    };

    const markTile = (row, col, marker) => {
        let validTile = false;

        if (row < 0 || row > 3 || col < 0 || col > 3) {
            console.log('Invalid choice');
        } else if (board[row][col] === 0) {
            board[row][col] = marker;
            validTile = true;
        } else {
            console.log('Invalid choice');
        };

        return validTile;
    };

    const printBoard = () => {
        for (i = 0; i < 3; i++) {
            console.log(board[i]);
        };
    };

    return {
        markTile,
        printBoard,
    };
}

const game = (function () {
    const board = createGameboard();
    const players = [
        createPlayer('Player One', 'X'),
        createPlayer('Player Two', '0'),
    ];
    let turn = 0;

    const getActivePlayer = () => players[turn % 2];

    const playTurn = (row, col) => {
        if (board.markTile(row, col, getActivePlayer().marker)) {
            turn++;
            printNewRound();
        };
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    printNewRound();

    return {
        playTurn,
        getActivePlayer,
    };
})();
