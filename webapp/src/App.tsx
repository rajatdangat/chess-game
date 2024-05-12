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
  const lastTwo = square.slice(-2);
  const file = lastTwo.charCodeAt(0) - 97;
  const rank = Number(lastTwo[1]);
  return [8 - rank, file];
};

export type BoardElement = {
  rank: number;
  file: number;
  type: string;
};

function App() {
  const [chess] = useState<Chess>(new Chess());
  const [boardHighlights, setBoardHighlights] = useState<BoardElement[]>([]);
  const [boardHints, setBoardHints] = useState<BoardElement[]>([]);

  const handleBoardClick = (i: number, j: number) => {
    const board = chess.board();
    const piece = board[i][j];
    if (piece !== null) {
      console.log("Clicked on piece!", piece, i, j);
      const moves = chess.moves({ square: piece.square });

      const hints: BoardElement[] = [];
      moves.forEach((move) => {
        const [rank, file] = squareNotationToIndex(move);
        hints.push({ rank, file, type: "hint" });
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

  return (
    <Container>
      <Chessboard
        chess={chess}
        boardHighlights={boardHighlights}
        boardHints={boardHints}
        handleBoardClick={handleBoardClick}
      />
    </Container>
  );
}

export default App;
