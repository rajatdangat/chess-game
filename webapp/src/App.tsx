import styled from "@emotion/styled";
import Chessboard from "./components/Chessboard";
import { useState } from "react";

const Container = styled.div`
  height: 100vh;
  background-color: #302e2b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const startingPositions: (string | null)[][] = [
  ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
  new Array(8).fill("WP"),
  new Array(8).fill(null),
  new Array(8).fill(null),
  new Array(8).fill(null),
  new Array(8).fill(null),
  new Array(8).fill("BP"),
  ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
];

function App() {
  const [pieceLocations, setPieceLocations] = useState(startingPositions);

  const handleBoardClick = (i: number, j: number) => {
    if (pieceLocations[i][j] !== null) {
      console.log("Clicked on piece!", pieceLocations[i][j]);
    } else {
      console.log("Clicked on empty square");
    }
  };

  return (
    <Container>
      <Chessboard pieceLocations={pieceLocations} handleBoardClick={handleBoardClick} />
    </Container>
  );
}

export default App;
