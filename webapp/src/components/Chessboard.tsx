import styled from "@emotion/styled";

import { chessPieces } from "../constants";

const darkBoardBg = "#739552";
const lightBoardBg = "#ebecd0";

const Board = styled.div`
  height: 800px;
  width: 800px;
  background-color: ${darkBoardBg};
  display: flex;
  flex-wrap: wrap;
  user-select: none;
`;

const BoardSquare = styled.div`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .light {
    color: ${lightBoardBg};
  }

  .dark {
    color: ${darkBoardBg};
  }
`;

const WhiteSquare = styled(BoardSquare)`
  background-color: ${lightBoardBg};
`;

const TransparentSquare = styled(BoardSquare)`
  background-color: transparent;
`;

const SquareLabel = styled.p`
  position: absolute;
  font-weight: 600;
  font-size: 1.4rem;
  font-family: sans-serif;
`;

const FileLabel = styled(SquareLabel)`
  bottom: 5px;
  right: 5px;
`;

const RankLabel = styled(SquareLabel)`
  top: 5px;
  left: 5px;
`;

const PieceImage = styled.img`
  width: 90%;
`;

type ChessboardProps = {
  startingPositions: (string | null)[][];
};

const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

const ranks: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

const drawChessboard = (startingPositions: (string | null)[][]) => {
  const squares = [];

  for (let i = ranks.length - 1; i >= 0; i--) {
    const rank = ranks[i];
    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const currentPiece = startingPositions[i][j];
      const chessPiece = currentPiece && chessPieces[currentPiece];
      squares.push(
        (i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 == 1) ? (
          <WhiteSquare key={rank + file}>
            {i === 0 && <FileLabel className="dark">{file}</FileLabel>}
            {j === 0 && <RankLabel className="dark">{rank}</RankLabel>}
            {chessPiece && <PieceImage draggable="false" src={chessPiece.image} />}
          </WhiteSquare>
        ) : (
          <TransparentSquare key={rank + file}>
            {i === 0 && <FileLabel className="light">{file}</FileLabel>}
            {j === 0 && <RankLabel className="light">{rank}</RankLabel>}
            {chessPiece && <PieceImage draggable="false" src={chessPiece.image} />}
          </TransparentSquare>
        )
      );
    }
  }

  return squares;
};

const Chessboard = ({ startingPositions }: ChessboardProps) => {
  return <Board>{drawChessboard(startingPositions)}</Board>;
};

export default Chessboard;
