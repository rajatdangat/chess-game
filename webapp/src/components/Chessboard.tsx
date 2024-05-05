import styled from "@emotion/styled";

const darkBoardBg = "#739552";
const lightBoardBg = "#ebecd0";

const Board = styled.div`
  height: 800px;
  width: 800px;
  background-color: ${darkBoardBg};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
`;

const BoardSquare = styled.div`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  position: relative;

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

const YLabel = styled(SquareLabel)`
  top: 5px;
  left: 5px;
`;

const XLabel = styled(SquareLabel)`
  bottom: 5px;
  right: 5px;
`;

const xCoords = ["a", "b", "c", "d", "e", "f", "g", "h"];

const yCoords = ["1", "2", "3", "4", "5", "6", "7", "8"];

const Chessboard = () => {
  return (
    <Board>
      {xCoords.map((x, xIndex) =>
        yCoords.map((y, yIndex) =>
          (xIndex % 2 === 0 && yIndex % 2 === 0) ||
          (xIndex % 2 === 1 && yIndex % 2 == 1) ? (
            <WhiteSquare key={x + y}>
              {xIndex === 0 && <YLabel className="dark">{y}</YLabel>}
              {yIndex === 0 && <XLabel className="dark">{x}</XLabel>}
            </WhiteSquare>
          ) : (
            <TransparentSquare key={x + y}>
              {xIndex === 0 && <YLabel className="light">{y}</YLabel>}
              {yIndex === 0 && <XLabel className="light">{x}</XLabel>}
            </TransparentSquare>
          )
        )
      )}
    </Board>
  );
};

export default Chessboard;
