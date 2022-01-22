import styled from "styled-components";
import { memo } from "react";

import GameStep from "./components/GameStep";
import GameBoard from "./components/GameBoard";
import GameButton from "./components/GameButton";

import useGomoku from "./customHooks/useGomoku";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 15px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerMessage = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const WinnerMessage = styled.div`
  color: red;
  font-size: 36px;
  font-weight: bolder;
  font-style: italic;
  font-family: monospace;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function GameMessage({ winner, roundBlack }) {
  console.log("render GameMessage");

  return (
    <>
      {!winner && (
        <PlayerMessage>
          玩家回合：<span>{roundBlack ? "黑子" : "白子"}</span>
        </PlayerMessage>
      )}
      {winner && (
        <WinnerMessage>
          勝負已分：
          <span>{winner === "draw" ? "平手" : `${winner.player}勝`}</span>
        </WinnerMessage>
      )}
    </>
  );
}

const MemoGameButton = memo(GameButton);
const MemoGameBoard = memo(GameBoard);
const MemoGameStep = memo(GameStep);

function App() {
  console.log("=== render App ===");

  const { boardState, setBoardState, winner, handleAddChess } = useGomoku();

  return (
    <Wrapper>
      <h1>五子棋</h1>
      <GameMessage winner={winner} roundBlack={boardState.roundBlack} />
      <Container>
        <MemoGameButton setBoardState={setBoardState} />
        <MemoGameBoard
          winner={winner}
          boardState={boardState}
          handleAddChess={handleAddChess}
        />
      </Container>
      <MemoGameStep boardState={boardState} setBoardState={setBoardState} />
    </Wrapper>
  );
}

export default App;
