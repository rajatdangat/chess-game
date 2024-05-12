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

const emptyBoardArray: null[][] = [];
for (let i = 0; i < 8; i++) {
  emptyBoardArray.push(new Array(8).fill(null));
}

export type BoardElement = {
  rank: number;
  file: number;
  type: string;
};

function App() {
  const [chess] = useState<Chess>(new Chess());
  const [boardHighlights, setBoardHighlights] = useState<BoardElement[]>([]);

  const handleBoardClick = (i: number, j: number) => {
    const board = chess.board();
    if (board[i][j] !== null) {
      console.log("Clicked on piece!", board[i][j], i, j);
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
      <Chessboard chess={chess} boardHighlights={boardHighlights} handleBoardClick={handleBoardClick} />
    </Container>
  );
}

export default App;
