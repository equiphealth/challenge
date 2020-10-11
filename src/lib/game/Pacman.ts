import { ArrowDownward } from '@material-ui/icons';
import { GameBoardItemType, KeyToGameDirection, GameDirectionMap, GameDirectionToKeys, GameDirection, pillMax, GameMode, GameDirectionReverseMap } from '../Map';
import Item from './Item';

class Pacman extends Item implements GameBoardItem {

  type: GameBoardItemType = GameBoardItemType.PACMAN;

  desiredMove: string | false = false;

  score: number = 0;

  running: boolean = false;

  timesRun: number = 0;

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
        this.running = false;
      }
      // activate and reset counter
      else {
        this.running = true;
        this.timesRun = 0;
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
        move = this.pathFind();
      }
      this.timesRun++;
    }
    if (move) {
      console.log('Move: ' + move['direction'])
    }
    console.log('Times Run: ' + this.timesRun);
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
    const facing = this.direction
    const behind = GameDirectionMap[GameDirectionReverseMap[facing]]
    // moves piece can see
    const { moves } = this.piece;
    // Remove remove behind pacman from view because he can't see behind him
    delete moves[behind];
    // to hold possible moves
    const possibleMoves: GameBoardItemMoves = {};

    // logic variables
    let ghostDir = null;
    let ghostSeen = false;
    let biscuitSeen = false;
    let pillSeen = false;
    let emptySpace = false;
    let DANGEROUS = false;

    // Check to see if Pac is DANGEROUS
    if (this.pillTimer.timer > 0) {
      DANGEROUS = true
    }
    // Looking around
    for (const dir in moves) {
      if (dir) {
        const move = moves[dir];
        //Look for ghosts
        let ghost = this.findItem(dir, GameBoardItemType.GHOST);
        if (ghost) {
          ghostSeen = true;
          ghostDir = dir;
          // If DANGEROUS
          if (DANGEROUS) {
            // EAT AND GROW FAT
            return { piece: move, direction: GameDirectionMap[dir] }
          }
        }
        //Look for biscuits
        let biscuit = this.findItem(dir, GameBoardItemType.BISCUIT);
        if (biscuit) {
          biscuitSeen = true;
          // Add biscuit room to possible moves
          possibleMoves[dir] = move
        }
        //Look for pill
        let pill = this.findItem(dir, GameBoardItemType.PILL);
        if (pill) {
          pillSeen = true;
          // Eat pill and become DANGEROUS
          return { piece: move, direction: GameDirectionMap[dir] }
        }
        //If empty
        let empty = this.findItem(dir, GameBoardItemType.EMPTY);
        if (empty) {
          emptySpace = true;
          possibleMoves[dir] = move
        }
      }
    }

    if (ghostSeen && ghostDir && !DANGEROUS) {
      console.log(possibleMoves);
      console.log('GHOST DETECTED: ' + ghostDir);
      delete possibleMoves[ghostDir];
      console.log(possibleMoves);
    }

    const nextMoves = Object.keys(possibleMoves);

    if (nextMoves.length < 1) return false;

    const move = Math.floor(Math.random() * nextMoves.length);
    return { piece: possibleMoves[nextMoves[move]], direction: GameDirectionMap[nextMoves[move]] };
  }
}

export default Pacman;