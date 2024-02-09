function Player(name, marker) {
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

function Gameboard() {
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

    return {
        markTile,
    };
}