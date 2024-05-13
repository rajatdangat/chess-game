import { useState } from "react";
import styled from "@emotion/styled";
import { Chess } from "chess.js";

import Chessboard from "./components/Chessboard";

const Container = styled.div`
  height: 100vh;
  background-color: #302e2b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const squareNotationToIndex = (square: string): [number, number] => {
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square[1]);
  return [8 - rank, file];
};

export type BoardElement = {
  rank: number;
  file: number;
  type: string;
};

export type HintElement = {
  rank: number;
  file: number;
  type: string;
  move: string;
};

const chess = new Chess();
const board = chess.board();

export type Board = typeof board;

function App() {
  const [board, setBoard] = useState<Board>(chess.board());
  const [boardHighlights, setBoardHighlights] = useState<BoardElement[]>([]);
  const [boardHints, setBoardHints] = useState<HintElement[]>([]);

  const handleBoardClick = (i: number, j: number) => {
    const piece = board[i][j];
    if (piece !== null) {
      console.log("Clicked on piece!", piece, i, j);
      const moves = chess.moves({ square: piece.square, verbose: true });
      console.log("moves", moves);

      const hints: HintElement[] = [];
      moves.forEach((move) => {
        const [rank, file] = squareNotationToIndex(move.to);
        hints.push({ rank, file, move: move.san, type: "hint" });
      });
      setBoardHints(hints);

      setBoardHighlights((prev) => {
        const newHighlights = prev.filter((highlight) => highlight.type !== "pieceSelect");
        return [...newHighlights, { rank: i, file: j, type: "pieceSelect" }];
      });
    } else {
      console.log("Clicked on empty square");
    }
  };

  const handleHintClick = (move: string) => {
    console.log(move);
    try {
      chess.move(move);
      setBoardHints([]);
      setBoard(chess.board());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Chessboard
        board={board}
        boardHighlights={boardHighlights}
        boardHints={boardHints}
        handleBoardClick={handleBoardClick}
        handleHintClick={handleHintClick}
      />
    </Container>
  );
}

export default App;
