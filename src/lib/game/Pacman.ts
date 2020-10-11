import { GameBoardItemType, KeyToGameDirection, GameDirectionMap, GameDirectionToKeys, GameDirection, pillMax, GameMode } from '../Map';
import Item from './Item';

class Pacman extends Item implements GameBoardItem {

  type: GameBoardItemType = GameBoardItemType.PACMAN;

  desiredMove: string | false = false;

  score: number = 0;

  running: boolean = false

  timesRun: number = 0

  constructor(piece: GameBoardPiece, items: GameBoardItem[][], pillTimer: GameBoardItemTimer) {
    super(piece, items, pillTimer);

    // Bind context for callback events
    this.handleKeyPress = this.handleKeyPress.bind(this);

    // Add a listener for keypresses for this object
    window.addEventListener('keypress', this.handleKeyPress, false);

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
    if (e.key.toUpperCase() === 'R') {
      // if running, deactivate
      if (this.running) {
        this.running = false
      }
      // activate and reset counter
      else {
        this.running = true
        this.timesRun = 0
      }
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
        move = { piece: moves[this.desiredMove], direction: GameDirectionMap[this.desiredMove] };
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

    // if PacMan is RUNNING
    if (this.running) {
      if (this.timesRun < 100) {
        move = this.pathFind()
      }
      this.timesRun++
    }
    console.log('Move: ' + move)
    console.log('Times Run: ' + this.timesRun)
    return move;

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
    if (typeof item !== 'undefined') {
      this.score += item.type;
      switch (item.type) {
        case GameBoardItemType.PILL:
          this.pillTimer.timer = pillMax;
          break;
        case GameBoardItemType.GHOST:
          if (typeof item.gotoTimeout !== 'undefined')
            item.gotoTimeout();
          break;
        default: break;
      }
    }
    this.setBackgroundItem({ type: GameBoardItemType.EMPTY });
    this.fillBackgroundItem();

    this.setPiece(piece, direction);
    this.items[piece.y][piece.x] = this;
  }

  /**
   * Traverse the maze:
   * Avoid ghosts
   * Eat Biscuits
   * Eat pills - become DANGEROUS
   * If DANGEROUS, hunt ghosts
   * @method pathFind
   */
  pathFind() {
    // which way is Pac looking?
    const facing = GameDirectionToKeys(this.direction)
    // moves piece can see
    const { moves } = this.piece;
    // to hold possible moves
    const possibleMoves: GameBoardItemMoves = {};

    // logic variables
    let ghostSeen = false;
    let biscuitSeen = false;
    let pillSeen = false;
    let emptySpace = false;
    let DANGEROUS = false;

    // for fleeing
    const reversePiece = this.piece;
    const reverseDirection = GameDirectionMap[this.direction];

    // Looking around
    for (const num in moves) {
      if (num) {
        const move = moves[num]
        //Look for biscuits
        let biscuit = this.findItem(num, GameBoardItemType.BISCUIT)
        if (biscuit) {
          biscuitSeen = true
          // Chase the biscuit
          return { piece: move, direction: GameDirectionMap[num] }
        }
        //Look for ghosts
        let ghost = this.findItem(num, GameBoardItemType.GHOST)
        if (ghost) {
          ghostSeen = true
        }
        //Look for pill
        let pill = this.findItem(num, GameBoardItemType.PILL)
        if (pill) {
          pillSeen = true
          // Chase the pill
          return { piece: move, direction: GameDirectionMap[num] }
        }
        //If empty
        let empty = this.findItem(num, GameBoardItemType.EMPTY)
        if (empty) {
          emptySpace = true
          possibleMoves[num] = move
        }
      }
    }

    const nextMoves = Object.keys(possibleMoves);

    if (nextMoves.length < 1) return false;

    const move = Math.floor(Math.random() * nextMoves.length);
    return { piece: possibleMoves[nextMoves[move]], direction: GameDirectionMap[nextMoves[move]] }
  }
}

export default Pacman;