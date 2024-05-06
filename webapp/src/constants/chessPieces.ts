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
    WR: {
        color: "white",
        name: "Rook",
        image: whiteRook,
    },
    WN: {
        color: "white",
        name: "Knight",
        image: whiteKnight,
    },
    WB: {
        color: "white",
        name: "Bishop",
        image: whiteBishop,
    },
    WQ: {
        color: "white",
        name: "Queen",
        image: whiteQueen,
    },
    WK: {
        color: "white",
        name: "King",
        image: whiteKing,
    },
    WP: {
        color: "white",
        name: "Pawn",
        image: whitePawn,
    },
    BR: {
        color: "black",
        name: "Rook",
        image: blackRook,
    },
    BN: {
        color: "black",
        name: "Knight",
        image: blackKnight,
    },
    BB: {
        color: "black",
        name: "Bishop",
        image: blackBishop,
    },
    BQ: {
        color: "black",
        name: "Queen",
        image: blackQueen,
    },
    BK: {
        color: "black",
        name: "King",
        image: blackKing,
    },
    BP: {
        color: "black",
        name: "Pawn",
        image: blackPawn,
    },
}