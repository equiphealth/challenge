import { GameBoardItemType, KeyToGameDirection, GameDirectionMap, GameDirectionToKeys, GameDirection, pillMax, GameMode } from '../Map';
import Item from './Item';

class Pacman extends Item implements GameBoardItem {

  type: GameBoardItemType = GameBoardItemType.PACMAN;

  desiredMove: string | false = false;

  score: number = 0;

  running: boolean = false

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
      if (this.running) {
        this.running = false
      }
      else {
        this.running = true
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
      let timesRun = 0
      if (timesRun < 100) {
        move = this.decision()
        timesRun++
      }
    }

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
   * Run the maze
   * 
   * method run
  //  */
  // run(): void {
  //   console.log('PRESSED RUN');

  //   let timesRun = 0;
  //   while (timesRun < 100) {
  //     this.decision()
  //     console.log(`Times Run: ${timesRun}`);
  //     timesRun++;
  //   }

  // }

  /**
   * Decide on move
   * @method decision
   */
  decision() {
    // moves piece can see
    const { moves } = this.piece;
    console.log(moves)
    // to hold possible moves
    const possibleMoves: GameBoardItemMoves = {};

    // logic variables
    let ghostSeen = false;
    const pillSeen = false;
    const fruitSeen = false;
    const DANGEROUS = false;

    // for fleeing
    const reversePiece = this.piece;
    const reverseDirection = GameDirectionMap[this.direction];

    // // for move in moves
    // for (const num in moves) {
    //   // if move exists
    //   if (num) {
    //     // direction from move list
    //     const move = moves[num];
    //     // GHOST DETECTION
    //     if (this.items[move.y][move.x].type === GameBoardItemType.GHOST) {
    //       ghostSeen = true;
    //       //flee if not dangerous
    //       if (!DANGEROUS) {
    //         possibleMoves[reverseDirection] = reversePiece;
    //       }
    //       //pursue if dangerous
    //       //if(DANGEROUS) {
    //       //pursuit code
    //       //}
    //     }
    //   }
    // }
    const nextMoves = Object.keys(possibleMoves);
    if (nextMoves.length < 1) return false;
    const move = Math.floor(Math.random() * nextMoves.length);
    return { piece: possibleMoves[nextMoves[move]], direction: GameDirectionMap[nextMoves[move]] }
  }
}

export default Pacman;