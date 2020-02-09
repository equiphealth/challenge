import { GameBoardItemType, KeyToGameDirection, GameDirectionMap, GameDirectionToKeys, GameDirection, pillMax } from '../Map';
import Item from './Item';

class Pacman extends Item implements GameBoardItem {

  type:GameBoardItemType = GameBoardItemType.PACMAN;

  desiredMove: string | false = false;

  score:number = 0;

  constructor(piece:GameBoardPiece, items:GameBoardItem[][], pillTimer:GameBoardItemTimer) {
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
        move = {piece: moves[this.desiredMove], direction: GameDirectionMap[this.desiredMove]};
        this.desiredMove = false;
      }
    }
    
    // Otherwise, continue in the last direction
    if (!move && this.direction !== GameDirection.NONE) {
      const key = GameDirectionToKeys(this.direction);
      if (moves[key]) {
        move = {piece: moves[key], direction: this.direction};
      }
    }

    return move;

  }

  /**
   * Returns the next automatically generated move.  Algorithm is to
   * calculate a score for each direction.  If the specified direction is behind
   * pacman or there is a ghost in that direction then that is the lowest score (-1).  
   * Walls have a score of 0, empty spaces 1, biscuit 2, and pill 3.  The
   * direction that first gets the max score wins.  The directions are checked in 
   * a random order to ensure pacman doesn't get stuck repeating the same moves over
   * and over.
   * 
   * @method getNextAutoMove
   * @return {GameBoardItemMove | boolean} Next move
   */
  getNextAutoMove(): GameBoardItemMove | boolean {

    const { moves } = this.piece;
    let desiredDirection = "";
    let maxScore = 0;
    let directions = ['up', 'down', 'left', 'right'];
    let reverseDirections = ['down', 'up', 'right', 'left'];

    
    let currIdx = Math.floor(Math.random() * Math.floor(4));

    if( moves !== undefined ){
      for( let cnt = 0; cnt < 4; cnt++ ){
        let currScore = this.getDirectionScore(directions[currIdx], reverseDirections[currIdx]); 
        if( currScore > maxScore ) {
          desiredDirection = directions[currIdx];
          maxScore = currScore;
        }
        currIdx = (currIdx + 1) % 4;
      }
    }

    if( desiredDirection !== "" ){
      return {piece: moves[desiredDirection], direction: GameDirectionMap[desiredDirection]};;
    }
    
    return false;
  }

  /**
   * Gets the score for the specified direction
   * 
   * @method getDirectionScore()
   * @return number The score for this direction
   */
  getDirectionScore( desiredDirection: string, reverseDirection: string ): number {

    let currScore = -1;
    const { moves } = this.piece;

    // If the desired direction is not behind us 
    if( this.direction !== GameDirectionMap[reverseDirection] ){
      // If there is a move available in the desired direction
      if( moves[desiredDirection] ){
        let testMove = moves[desiredDirection];
        // If the desired direction does not contain a ghost
        if( this.items[testMove.y][testMove.x].type !== GameBoardItemType.GHOST ) {
          currScore = 1
        }
        // And if it contains a biscuit increment again
        if( this.items[testMove.y][testMove.x].type === GameBoardItemType.BISCUIT ) {
          currScore = currScore+1;
        }
        // But if it contains a pill increment by 2
        if( this.items[testMove.y][testMove.x].type === GameBoardItemType.PILL ) {
          currScore = currScore+2;
        }
      }
    }

    return currScore;
  }

  /**
   * Move Pacman and "eat" the item
   * 
   * @method move
   * @param {GameBoardPiece} piece 
   * @param {GameDirection} direction 
   */
  move(piece: GameBoardPiece, direction: GameDirection):void {

    const item = this.items[piece.y][piece.x];
    if (typeof item !== 'undefined') {
      this.score += item.type;
      switch(item.type) {
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

}

export default Pacman;