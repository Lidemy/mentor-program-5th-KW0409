import { useState, useRef, useEffect, useCallback } from "react";

import { findWinner } from "../utils";
import { GAME_SIZE } from "../constant/data";

export default function useGomoku() {
  const [boardState, setBoardState] = useState({
    history: [
      { boardValues: Array(GAME_SIZE).fill(Array(GAME_SIZE).fill(null)) },
    ],
    stepRound: 0,
    roundBlack: true,
  });
  const [winner, setWinner] = useState(null);

  const lastChessPositionRef = useRef();
  const winnerRef = useRef(null); // 避免在 handleAddChess 需要用 useState 的 winner 去判斷

  const handleAddChess = useCallback((chessValue, position) => {
    if (winnerRef.current || chessValue) return;
    lastChessPositionRef.current = position;
    const [row, col] = position;

    setBoardState((prevState) => {
      const newHistory = prevState.history.slice(0, prevState.stepRound + 1);
      const current = newHistory[newHistory.length - 1];
      const currentBoard = JSON.parse(JSON.stringify(current.boardValues));
      currentBoard[row][col] = prevState.roundBlack ? "Black" : "White";

      return {
        history: newHistory.concat([{ boardValues: currentBoard }]),
        stepRound: newHistory.length,
        roundBlack: !prevState.roundBlack,
      };
    });
  }, []);

  useEffect(() => {
    if (winner) {
      winnerRef.current = null;
      setWinner(null);
    }
    if (!lastChessPositionRef.current) return;

    const { history } = boardState;
    const currentBoard = history[boardState.stepRound].boardValues;
    const result = findWinner(currentBoard, lastChessPositionRef.current);
    if (result) {
      alert("勝負已分！");
      if (result === "draw") {
        winnerRef.current = result;
        return setWinner(result);
      }
      winnerRef.current = result.player;
      return setWinner({
        player: result.player,
        winnerArr: result.winnerArr,
      });
    }
  }, [boardState]);

  return {
    boardState,
    setBoardState,
    winner,
    handleAddChess,
  };
}
