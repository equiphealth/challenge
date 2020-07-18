import {
  GameBoardItemType,
  KeyToGameDirection,
  GameDirectionMap,
  GameDirectionToKeys,
  GameDirection,
  pillMax,
  GameDirectionReverseMap,
} from "../Map";
import Item from "./Item";

class Pacman extends Item implements GameBoardItem {
  type: GameBoardItemType = GameBoardItemType.PACMAN;

  desiredMove: string | false = false;

  score: number = 0;

  pursuit: string | boolean = false;

  constructor(
    piece: GameBoardPiece,
    items: GameBoardItem[][],
    pillTimer: GameBoardItemTimer
  ) {
    super(piece, items, pillTimer);

    // Bind context for callback events
    this.handleKeyPress = this.handleKeyPress.bind(this);

    // Add a listener for keypresses for this object
    window.addEventListener("keypress", this.handleKeyPress, false);
  }

  /**
   * Handle a keypress from the keyboard
   *
   * @method handleKeyPress
   * @param {KeyboardEvent} e Input event
   */
  handleKeyPress(e: KeyboardEvent): void {
    if (KeyToGameDirection[e.key.toUpperCase()]) {
      this.desiredMove = KeyToGameDirection[e.key.toUpperCase()];
    }
  }

  /**
   * Returns the next move from the keyboard input
   *
   * @method getNextMove
   * @return {GameBoardItemMove | boolean} Next move
   */
  getNextMove(): GameBoardItemMove | boolean {
    const { moves } = this.piece;

    let move: GameBoardItemMove | false = false;

    // If there is a keyboard move, use it and clear it
    if (this.desiredMove) {
      if (moves[this.desiredMove]) {
        move = {
          piece: moves[this.desiredMove],
          direction: GameDirectionMap[this.desiredMove],
        };
        this.desiredMove = false;
      }
    }

    // Otherwise, continue in the last direction
    if (!move && this.direction !== GameDirection.NONE) {
      const key = GameDirectionToKeys(this.direction);
      if (moves[key]) {
        move = { piece: moves[key], direction: this.direction };
      }
    }

    return move;
  }

  getAutomatedNextMove(): GameBoardItemMove | boolean {
    const { moves } = this.piece;

    let dangerSeen: boolean = false;

    let reversePiece: GameBoardPiece = this.piece;
    let reverseDirection: string = GameDirectionMap[this.direction];

    const newMoves: GameBoardItemMoves = {};

    for (const idx in moves) {
      if (idx) {
        const move = moves[idx];
        const ghost = this.findItem(idx, GameBoardItemType.GHOST);
        let dangerAhead = false;
        // console.log(move);
        // Check if ghost is ahead and dangerous
        if (ghost) {
          dangerAhead = true;
          dangerSeen = true;
        }
        // If there is no danger ahead, and we aren't going backwards
        if (
          !dangerAhead &&
          GameDirectionMap[GameDirectionReverseMap[idx]] !== this.direction
        ) {
          newMoves[idx] = move;
        } else if (
          GameDirectionMap[GameDirectionReverseMap[idx]] === this.direction
        ) {
          reversePiece = move;
          reverseDirection = idx;
        }
      }
    }

    if (dangerSeen) {
      newMoves[reverseDirection] = reversePiece;
    }

    const newMovesIdx = Object.keys(newMoves);

    if (newMovesIdx.length < 1) return false;

    const move = Math.floor(Math.random() * newMovesIdx.length);

    return {
      piece: newMoves[newMovesIdx[move]],
      direction: GameDirectionMap[newMovesIdx[move]],
    };
  }

  /**
   * Move Pacman and "eat" the item
   *
   * @method move
   * @param {GameBoardPiece} piece
   * @param {GameDirection} direction
   */
  move(piece: GameBoardPiece, direction: GameDirection): void {
    const item = this.items[piece.y][piece.x];
    if (typeof item !== "undefined") {
      this.score += item.type;
      switch (item.type) {
        case GameBoardItemType.PILL:
          this.pillTimer.timer = pillMax;
          break;
        case GameBoardItemType.GHOST:
          if (typeof item.gotoTimeout !== "undefined") item.gotoTimeout();
          break;
        default:
          break;
      }
    }
    this.setBackgroundItem({ type: GameBoardItemType.EMPTY });
    this.fillBackgroundItem();

    this.setPiece(piece, direction);
    this.items[piece.y][piece.x] = this;
  }
}

export default Pacman;
