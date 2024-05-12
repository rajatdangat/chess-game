import blackBishop from "../assets/pieces/black-bishop.png";
import blackKing from "../assets/pieces/black-king.png"
import blackKnight from "../assets/pieces/black-knight.png"
import blackPawn from "../assets/pieces/black-pawn.png"
import blackQueen from "../assets/pieces/black-queen.png"
import blackRook from "../assets/pieces/black-rook.png"
import whiteBishop from "../assets/pieces/white-bishop.png"
import whiteKing from "../assets/pieces/white-king.png"
import whiteKnight from "../assets/pieces/white-knight.png"
import whitePawn from "../assets/pieces/white-pawn.png"
import whiteQueen from "../assets/pieces/white-queen.png"
import whiteRook from "../assets/pieces/white-rook.png"

console.log("Black bishop: ", blackBishop)

type ChessPiece = {
    color: string;
    name: string;
    image: string;
};

type ChessPieces = {
  readonly [key: string]: ChessPiece;
};

export const chessPieces: ChessPieces = {
    wr: {
        color: "white",
        name: "Rook",
        image: whiteRook,
    },
    wn: {
        color: "white",
        name: "Knight",
        image: whiteKnight,
    },
    wb: {
        color: "white",
        name: "Bishop",
        image: whiteBishop,
    },
    wq: {
        color: "white",
        name: "Queen",
        image: whiteQueen,
    },
    wk: {
        color: "white",
        name: "King",
        image: whiteKing,
    },
    wp: {
        color: "white",
        name: "Pawn",
        image: whitePawn,
    },
    br: {
        color: "black",
        name: "Rook",
        image: blackRook,
    },
    bn: {
        color: "black",
        name: "Knight",
        image: blackKnight,
    },
    bb: {
        color: "black",
        name: "Bishop",
        image: blackBishop,
    },
    bq: {
        color: "black",
        name: "Queen",
        image: blackQueen,
    },
    bk: {
        color: "black",
        name: "King",
        image: blackKing,
    },
    bp: {
        color: "black",
        name: "Pawn",
        image: blackPawn,
    },
}