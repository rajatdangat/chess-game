import styled from "@emotion/styled";
import Chessboard from "./components/Chessboard";

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
  return (
    <Container>
      <Chessboard startingPositions={startingPositions} />
    </Container>
  );
}

export default App;
