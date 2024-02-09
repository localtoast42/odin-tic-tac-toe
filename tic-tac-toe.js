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
        board[i] = 0;
        for (let j = 0; j < 3; j++) {
            board[i][j] = 0;
        };
    };

    const markTile = (row, col, marker) => {
        if (board[row][col] === 0) {
            board[row][col] = marker;
        };
    };

    const printBoard = () => {
        console.log(board);
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
        board.markTile(row, col, getActivePlayer().marker);
        turn++;
        printNewRound();
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
