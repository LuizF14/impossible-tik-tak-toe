export function convertToTable(board, firstPlayer) {
    return board.map(square =>{
      if (square == 'X' && firstPlayer == 'P' || square == 'O' && firstPlayer == 'B') return 'P';
      else if (square == 'O' && firstPlayer == 'P' || square == 'X' && firstPlayer == 'B') return 'B';
      else return '-';
    });
}
  
export function convertToBoard(table, firstPlayer) {
    return table.map((square, index) => {
            if (square == 'P' && firstPlayer == 'P' || square == 'B' && firstPlayer == 'B') return 'X';
            else if (square == 'B' && firstPlayer == 'P' || square == 'P' && firstPlayer == 'B') return 'O';
            else return index + 1;
    });
}

export function calculateWinner (squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }  
    return null;
}

export function gameHasTied (squares) {
    const numberSquares = squares.filter(el => typeof el === 'number');
    if (numberSquares.length === 0) return true;
    return false;
}