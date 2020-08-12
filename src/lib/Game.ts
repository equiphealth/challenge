import { GameBoardItemType, GameBoardPieceType, GameMode, GhostColor, GameSetUp } from './Map';
import Ghost from './game/Ghost';
import Pacman from './game/Pacman';
import Pacman2 from './game/Pacman2';
import { number } from 'prop-types';

/** Enumerate the board pieces */
enum gameMap {
  WALL = 0,
  BISCUIT = 1,
  EMPTY = 2,
  GHOST = 3,
  PILL = 4,
  PACMAN = 5,
  PACMAN2 = 6
};

/** Hold Ghost Colors */
const GhostColorMap = [GhostColor.BLUE, GhostColor.ORANGE, GhostColor.RED, GhostColor.VIOLET];

/** Holds the gameBoard state */
const gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 1, 0, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * Create a list of possible moves from any position
 * 
 * @function GetPossibleMoves
 * 
 * @param number i Column position
 * @param number j Row position
 * @return {GameBoardPosition[]} Array of possible moves
 */
const GetPossibleMoves = (i: number, j: number, layout: GameBoardPiece[][]): GameBoardItemMoves => {

  const height = layout.length;
  const { length } = layout[0];

  const possibleMoves: GameBoardItemMoves = {};

  possibleMoves.up = layout[j === 0 ? height - 1 : j - 1][i];
  possibleMoves.down = layout[j === height - 1 ? 0 : j + 1][i];
  possibleMoves.left = layout[j][i === 0 ? length - 1 : i - 1];
  possibleMoves.right = layout[j][i === length - 1 ? 0 : i + 1];

  Object.keys(possibleMoves).map(key => {
    if (possibleMoves[key].type === GameBoardPieceType.WALL) delete possibleMoves[key];
    return true;
  });

  return possibleMoves;
};

/**
 * Convert move positions to pieces
 * 
 * @function ConvertMovesToPieces
 * 
 * @param {GameBoardPiece[][]} layout Total Board Layout
 */
const ProcessLayout = (layout: GameBoardPiece[][]): GameBoardPiece[][] => {

  const newLayout = layout;

  for (let y = 0; y < layout.length; y += 1) {
    for (let x = 0; x < layout[y].length; x += 1) {
      newLayout[y][x].moves = GetPossibleMoves(x, y, layout);
    }
  }

  return newLayout;

};

/**
 * Convert a data array to game objects
 * 
 * @function InitializeGame
 * @return {GameState} Fresh Game to play on
 */
const InitializeGame = (AutoPlay = false, TwoPlayers = false): GameState => {
  let layout: GameBoardPiece[][] = [];
  const items: GameBoardItem[][] = [];
  const GhostStartPoints: GameBoardPiece[] = [];
  const GhostStore = [];
  let colorIdx = 0;
  const turn = 0;
  let mode: GameMode = GameMode.PLAYING;
  let setup: GameSetUp = GameSetUp.ONE_PLAYER;
  const pillTimer: GameBoardItemTimer = { timer: 0 };
  const PacmanStore: Pacman = new Pacman({ id: 'DUMMY', x: 0, y: 0, type: GameBoardPieceType.EMPTY, moves: {} }, items, pillTimer);
  const PacmanStore2: Pacman2 = new Pacman2({ id: 'DUMMY', x: 0, y: 0, type: GameBoardPieceType.EMPTY, moves: {} }, items, pillTimer);
  AutoPlay ? mode = GameMode.AUTO : mode = GameMode.PLAYING;


  if (TwoPlayers) {
    gameBoard[10][3] = 5;
    gameBoard[10][15] = 6;
    gameBoard[12][9] = 1;
    setup = GameSetUp.TWO_PLAYERS;

    for (let y = 0; y < gameBoard.length; y += 1) {

      const layoutRow: GameBoardPiece[] = [];
      const itemsRow: GameBoardItem[] = [];

      for (let x = 0; x < gameBoard[y].length; x += 1) {

        const val = gameBoard[y][x];
        const id = `PIECE::${y}::${x}`;

        let item: GameBoardItem = { type: GameBoardItemType.EMPTY };
        const piece: GameBoardPiece = {
          id, y, x, type: GameBoardPieceType.EMPTY, moves: {}
        };

        switch (val) {
          case gameMap.WALL:
            piece.type = GameBoardPieceType.WALL;
            break;
          case gameMap.BISCUIT:
            item = { type: GameBoardItemType.BISCUIT };
            break;
          case gameMap.PILL:
            item = { type: GameBoardItemType.PILL };
            break;
          case gameMap.PACMAN:
            PacmanStore.setPiece(piece);
            item = PacmanStore;
            break;
          case gameMap.PACMAN2:
            PacmanStore2.setPiece(piece);
            item = PacmanStore2;
            break;
          case gameMap.GHOST:
            GhostStartPoints.push(piece);
            item = new Ghost(piece, items, pillTimer, GhostStartPoints, GhostColorMap[colorIdx]);
            colorIdx += 1;
            GhostStore.push(item);
            break;
          default: break;
        }

        layoutRow.push(piece);
        itemsRow.push(item);
      }

      layout.push(layoutRow);
      items.push(itemsRow);
    }
    layout = ProcessLayout(layout);

    return { mode, turn, GhostStartPoints, layout, items, GhostStore, PacmanStore, PacmanStore2, pillTimer, setup };
  }

  for (let y = 0; y < gameBoard.length; y += 1) {
    gameBoard[10][3] = 2;
    gameBoard[10][15] = 2;
    gameBoard[12][9] = 5;
    const layoutRow: GameBoardPiece[] = [];
    const itemsRow: GameBoardItem[] = [];

    for (let x = 0; x < gameBoard[y].length; x += 1) {

      const val = gameBoard[y][x];
      const id = `PIECE::${y}::${x}`;

      let item: GameBoardItem = { type: GameBoardItemType.EMPTY };
      const piece: GameBoardPiece = {
        id, y, x, type: GameBoardPieceType.EMPTY, moves: {}
      };

      switch (val) {
        case gameMap.WALL:
          piece.type = GameBoardPieceType.WALL;
          break;
        case gameMap.BISCUIT:
          item = { type: GameBoardItemType.BISCUIT };
          break;
        case gameMap.PILL:
          item = { type: GameBoardItemType.PILL };
          break;
        case gameMap.PACMAN:
          PacmanStore.setPiece(piece);
          item = PacmanStore;
          break;
        case gameMap.GHOST:
          GhostStartPoints.push(piece);
          item = new Ghost(piece, items, pillTimer, GhostStartPoints, GhostColorMap[colorIdx]);
          colorIdx += 1;
          GhostStore.push(item);
          break;
        default: break;
      }

      layoutRow.push(piece);
      itemsRow.push(item);
    }

    layout.push(layoutRow);
    items.push(itemsRow);
  }


  layout = ProcessLayout(layout);

  return { mode, turn, GhostStartPoints, layout, items, GhostStore, PacmanStore, PacmanStore2, pillTimer, setup };

};

export { InitializeGame };

export default InitializeGame;
