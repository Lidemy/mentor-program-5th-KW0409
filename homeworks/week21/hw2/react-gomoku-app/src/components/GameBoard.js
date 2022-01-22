import styled from "styled-components";
import { useCallback, memo } from "react";

import {
  blackChess,
  blackChessImportant,
  whiteChess,
  whiteChessImportant,
} from "../constant/chessStyle";

const BoardContainer = styled.div`
  background: rgb(200 160 90);
  border: 1px solid rgb(102, 102, 102);
  border-radius: 3px;
  box-shadow: rgb(45 45 45 / 50%) 5px 5px 10px;

  ${(props) => `
    & i:hover {
      ${props.$roundBlack && blackChess};
      ${!props.$roundBlack && whiteChess};
    }
  `}
}
`;

const BoardRow = styled.div`
  display: flex;
`;

const BoardCol = styled.div`
  width: 35px;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  line-height: 34px;
  position: relative;

  /* 直線 */
  &:before {
    content: "";
    width: 2px;
    height: 100%;
    background: #606060;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    ${(props) =>
      props.$row === 0 &&
      `
      top: 50%;
    `}

    ${(props) =>
      props.$row === 18 &&
      `
      bottom: 50%;
    `}
  }

  /* 橫線 */
  &:after {
    content: "";
    width: 100%;
    height: 2px;
    background: #606060;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    ${(props) =>
      props.$col === 0 &&
      `
      left: 50%;
    `}

    ${(props) =>
      props.$col === 18 &&
      `
      right: 50%;
    `}
  }

  &:focus {
    outline: none;
  }
`;

const BoardDot = styled.div`
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Chess = styled.i`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: pointer;

  ${(props) =>
    !props.$chessValue &&
    `
    &:hover {
      opacity: 0.8;
    }
  `}

  ${(props) =>
    props.$chessValue &&
    `
    ${props.$chessValue === "Black" && blackChess};
    ${props.$chessValue === "White" && whiteChess};

    &:hover {
      ${props.$chessValue === "Black" && blackChessImportant};
      ${props.$chessValue === "White" && whiteChessImportant};
    }
  `}

  @keyframes shine {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    to {
      opacity: 1;
    }
  }

  ${(props) =>
    props.$isShine &&
    `
    animation: shine 1.5s linear infinite;
  `}
`;

function BoardCell({ row, col, winner, chessValue, handleAddChess }) {
  console.log("BoardCell");

  const boardDot = useCallback((row, col) => {
    const DotArr = [3, 9, 15];
    return DotArr.includes(row) && DotArr.includes(col);
  }, []);

  const isShine = useCallback(
    (row, col) => {
      if (!winner || !winner.winnerArr) return;
      const { winnerArr } = winner;
      for (const position of winnerArr) {
        const [positionRow, positionCol] = position;
        if (row === positionRow && col === positionCol) return true;
      }
    },
    [winner]
  );

  return (
    <BoardCol $row={row} $col={col}>
      {boardDot(row, col) && <BoardDot />}
      <Chess
        $isShine={isShine(row, col)}
        $chessValue={chessValue}
        onClick={() => handleAddChess(chessValue, [row, col])}
      />
    </BoardCol>
  );
}

const MemoBoardCell = memo(BoardCell);

export default function GameBoard({ winner, boardState, handleAddChess }) {
  console.log("render GameBoard");

  const currentBoard = boardState.history[boardState.stepRound].boardValues;

  return (
    <BoardContainer $roundBlack={boardState.roundBlack}>
      {currentBoard.map((rowArr, rowIndex) => (
        <BoardRow key={`row-${rowIndex}`}>
          {rowArr.map((colValue, colIndex) => (
            <MemoBoardCell
              key={`col-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              winner={winner}
              chessValue={colValue}
              handleAddChess={handleAddChess}
            />
          ))}
        </BoardRow>
      ))}
    </BoardContainer>
  );
}
