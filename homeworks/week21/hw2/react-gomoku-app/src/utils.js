export function countTotal(currentBoard, lastPosition, directionPosition) {
  const [lastChessRow, lastChessCol] = lastPosition;
  const [direcRow, direcCol] = directionPosition;
  const now = currentBoard[lastChessRow][lastChessCol];

  let tempRow = lastChessRow;
  let tempCol = lastChessCol;
  let total = 0;
  let chessArr = [];

  do {
    tempRow += direcRow;
    tempCol += direcCol;

    if (currentBoard[tempRow] && currentBoard[tempRow][tempCol] === now) {
      total++;
      chessArr.push([tempRow, tempCol]);
    } else {
      break;
    }
  } while (true);

  return [total, chessArr];
}

const direcArr = [
  [
    [0, 1],
    [0, -1],
  ],
  [
    [1, 0],
    [-1, 0],
  ],
  [
    [1, 1],
    [-1, -1],
  ],
  [
    [-1, 1],
    [1, -1],
  ],
];

export function findWinner(currentBoard, lastPosition) {
  const [row, col] = lastPosition;
  const now = currentBoard[row][col];
  if (!now) return; // 此判斷可在回到過去的步數時，避免進行多餘的判斷

  for (const innerArr of direcArr) {
    if (
      countTotal(currentBoard, lastPosition, innerArr[0])[0] +
        countTotal(currentBoard, lastPosition, innerArr[1])[0] ===
      4
    ) {
      return {
        player: now === "Black" ? "黑子" : "白子",
        winnerArr: [
          ...countTotal(currentBoard, lastPosition, innerArr[0])[1],
          ...countTotal(currentBoard, lastPosition, innerArr[1])[1],
          lastPosition,
        ],
      };
    }
  }

  if (currentBoard.every((rowArr) => rowArr.every((colValue) => colValue))) {
    return "draw";
  }
}
