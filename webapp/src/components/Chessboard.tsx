import styled from "@emotion/styled";

import { chessPieces } from "../constants";
import { Board, BoardElement, HintElement } from "../App";

const blackBoardBg = "#739552";
const whiteBoardBg = "#ebecd0";
const highlightColor = "#ffff33";
const hintColor = "#00000024";

const BoardContainer = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${blackBoardBg};
  display: flex;
  flex-wrap: wrap;
  user-select: none;
`;

const BoardSquare = styled.div`
  height: 100%;
  width: calc(100% / 8);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .light {
    color: ${whiteBoardBg};
  }

  .dark {
    color: ${blackBoardBg};
  }
`;

const WhiteSquare = styled(BoardSquare)`
  background-color: ${whiteBoardBg};
`;

const TransparentSquare = styled(BoardSquare)`
  background-color: transparent;
`;

const RankRow = styled.div`
  height: calc(100% / 8);
  width: 100%;
  display: flex;
`;

const SquareLabel = styled.p`
  position: absolute;
  font-weight: 600;
  font-size: min(1.4rem, 2.5vw);
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
  z-index: 100;
`;

const BoardHighlightSquare = styled.div<BoardElementProps>`
  height: calc(100% / 8);
  width: calc(100% / 8);
  background-color: ${highlightColor};
  opacity: 50%;
  position: absolute;
  transform: ${(props) => `translate(${props.file * 100}%, ${props.rank * 100}%)`};
`;

const BoardHintSquare = styled.div<BoardElementProps>`
  height: calc(100% / 8);
  width: calc(100% / 8);
  position: absolute;
  z-index: 200;
  transform: ${(props) => `translate(${props.file * 100}%, ${props.rank * 100}%)`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HintMoveCircle = styled.div`
  background-color: ${hintColor};
  border-radius: 50%;
  width: 30%;
  height: 30%;
`;

const HintCaptureCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-width: 1.2vw;
  border-style: solid;
  box-sizing: border-box;
  border-color: ${hintColor};
`;

type HandleBoardClickFn = (i: number, j: number) => void;
type HandleHintClickFn = (move: string, rank: number, file: number) => void;

type ChessboardProps = {
  board: Board;
  boardHighlights: BoardElement[];
  boardHints: HintElement[];
  handleBoardClick: HandleBoardClickFn;
  handleHintClick: HandleHintClickFn;
};

type BoardElementProps = {
  file: number;
  rank: number;
};

const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

const ranks: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

const drawChessboard = (board: Board, handleBoardClick: HandleBoardClickFn) => {
  const rankSquares = [];

  for (let i = 0; i < ranks.length; i++) {
    const fileSquares = [];
    const rank = ranks[i];
    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const currentPiece = board[i][j];
      const chessPiece = currentPiece && chessPieces[currentPiece.color + currentPiece.type];
      fileSquares.push(
        (i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 == 1) ? (
          <WhiteSquare onClick={() => handleBoardClick(i, j)} key={rank + file} id={`${i}${j}`}>
            {i === 7 && <FileLabel className="dark">{file}</FileLabel>}
            {j === 0 && <RankLabel className="dark">{9 - rank}</RankLabel>}
            {chessPiece && <PieceImage draggable="false" src={chessPiece.image} />}
          </WhiteSquare>
        ) : (
          <TransparentSquare onClick={() => handleBoardClick(i, j)} key={rank + file} id={`${i}${j}`}>
            {i === 7 && <FileLabel className="light">{file}</FileLabel>}
            {j === 0 && <RankLabel className="light">{9 - rank}</RankLabel>}
            {chessPiece && <PieceImage draggable="false" src={chessPiece.image} />}
          </TransparentSquare>
        )
      );
    }
    rankSquares.push(<RankRow key={i}>{fileSquares}</RankRow>);
  }

  return rankSquares;
};

const drawChessboardHighlights = (boardHighlights: BoardElement[]) => {
  return boardHighlights.map((highlight) => (
    <BoardHighlightSquare key={`${highlight.rank}${highlight.file}`} rank={highlight.rank} file={highlight.file} />
  ));
};

const drawChessboardHints = (boardHints: HintElement[], handleHintClick: HandleHintClickFn) => {
  return boardHints.map((hint) => (
    <BoardHintSquare
      key={`${hint.rank}${hint.file}`}
      rank={hint.rank}
      file={hint.file}
      onClick={() => handleHintClick(hint.move, hint.rank, hint.file)}
    >
      {hint.move.includes("x") ? <HintCaptureCircle /> : <HintMoveCircle />}
    </BoardHintSquare>
  ));
};

const Chessboard = ({ board, boardHighlights, boardHints, handleBoardClick, handleHintClick }: ChessboardProps) => {
  return (
    <BoardContainer>
      {drawChessboard(board, handleBoardClick)}
      {drawChessboardHighlights(boardHighlights)}
      {drawChessboardHints(boardHints, handleHintClick)}
    </BoardContainer>
  );
};

export default Chessboard;
