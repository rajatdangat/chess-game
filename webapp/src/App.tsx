import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Chess, Move } from "chess.js";

import Chessboard from "./components/Chessboard";

const wasmSupported =
  typeof WebAssembly === "object" && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));

const stockfish = new Worker(wasmSupported ? "/stockfish/stockfish.wasm.js" : "/stockfish/stockfish.js");

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

const getPromotionHints = (moves: Move[]): Record<string, PromotionHint> => {
  return moves
    .filter((move) => move.promotion)
    .reduce((acc: Record<string, PromotionHint>, curr) => {
      const [rank, file] = squareNotationToIndex(curr.to);
      if (acc[curr.to]) {
        acc[curr.to].move = {
          ...(acc[curr.to].move as Record<string, string>),
          [curr.promotion as string]: curr.san,
        };
      } else {
        acc[curr.to] = {
          rank,
          file,
          isCapture: Boolean(curr.captured),
          move: { [curr.promotion as string]: curr.san },
        };
      }
      return acc;
    }, {});
};

const gameOver = () => {
  window.alert("Game Over");
  chess.reset();
};

export type BoardElement = {
  rank: number;
  file: number;
  type: string;
};

export type HintMove = string | Record<string, string>;

export type HintElement = {
  rank: number;
  file: number;
  type: string;
  move: HintMove;
  isCapture: boolean;
};

export type PromotionHint = Omit<HintElement, "type">;

const chess = new Chess("r7/1P6/8/8/8/8/1K3p2/4k3 w - - 0 1");
const initialBoard = chess.board();

export type Board = typeof initialBoard;

function App() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [boardHighlights, setBoardHighlights] = useState<BoardElement[]>([]);
  const [boardHints, setBoardHints] = useState<HintElement[]>([]);
  const isEffectCalled = useRef<boolean>(false);

  useEffect(() => {
    if (isEffectCalled.current) {
      return;
    }

    stockfish.addEventListener("message", function (e) {
      console.log(e.data);
      const response = e.data.split(" ");
      if (response[0] === "bestmove") {
        console.log("bestomve", response[1]);
        const from = response[1].slice(0, 2);
        const to = response[1].slice(2);
        chess.move(response[1]);

        const [fromRank, fromFile] = squareNotationToIndex(from);
        const [toRank, toFile] = squareNotationToIndex(to);

        setBoard(chess.board());
        setBoardHighlights((prev) => {
          const newHighlights = prev.filter(
            (highlight) => highlight.type !== "pieceMoveOldPosition" && highlight.type !== "pieceMoveNewPosition"
          );
          return [
            ...newHighlights,
            { rank: fromRank, file: fromFile, type: "pieceMoveOldPosition" },
            { rank: toRank, file: toFile, type: "pieceMoveNewPosition" },
          ];
        });
      }
    });

    stockfish.postMessage("uci");

    stockfish.postMessage("setoption name Skill Level value 1");

    stockfish.postMessage(`position fen ${chess.fen()}`);

    isEffectCalled.current = true;
  }, []);

  // TODO: game over dialog should display after last move is made
  useEffect(() => {
    if (chess.isGameOver()) {
      gameOver();
    }
  }, [board]);

  // TODO: if the piece is unselected then the hints should disappear
  const handleBoardClick = (i: number, j: number) => {
    const piece = board[i][j];
    if (piece !== null) {
      console.log("Clicked on piece!", piece, i, j);
      const moves = chess.moves({ square: piece.square, verbose: true });
      console.log("moves", moves);
      console.log("turn", chess.turn());
      if (chess.turn() === "w") {
        const hints: HintElement[] = [];

        const promotionHints = getPromotionHints(moves);

        Object.values(promotionHints).forEach(({ rank, file, move, isCapture }) => {
          hints.push({ rank, file, move, isCapture, type: "hint" });
        });

        moves
          .filter((move) => !move.promotion)
          .forEach((move) => {
            const [rank, file] = squareNotationToIndex(move.to);
            hints.push({ rank, file, move: move.san, isCapture: Boolean(move.captured), type: "hint" });
          });

        setBoardHints(hints);
      }

      setBoardHighlights((prev) => {
        const newHighlights = prev.filter((highlight) => highlight.type !== "pieceSelect");
        const alreadyHighlighted = prev.filter((highlight) => highlight.rank === i && highlight.file === j);
        if (!alreadyHighlighted.length) {
          newHighlights.push({ rank: i, file: j, type: "pieceSelect" });
        }
        return newHighlights;
      });
    } else {
      console.log("Clicked on empty square");
    }
  };

  const handleHintClick = (hintMove: HintMove, rank: number, file: number) => {
    // TODO: show dropdown to select a piece
    const move = typeof hintMove === "object" ? hintMove["q"] : hintMove;
    try {
      chess.move(move);
      stockfish.postMessage(`position fen ${chess.fen()}`);
      setBoardHints([]);
      setBoard(chess.board());
      const pieceSelectHighlight = boardHighlights.find((highlight) => highlight.type === "pieceSelect");
      if (pieceSelectHighlight) {
        setBoardHighlights([
          { ...pieceSelectHighlight, type: "pieceMoveOldPosition" },
          { rank, file, type: "pieceMoveNewPosition" },
        ]);
      }

      stockfish.postMessage("go depth 1");
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
