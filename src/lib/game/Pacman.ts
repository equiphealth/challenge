import { GameBoardItemType, KeyToGameDirection, GameDirectionMap, GameDirectionToKeys, GameDirection, pillMax } from '../Map';
import DecisionTree from '../DecisionTree/DecisionTree';
import Item from './Item';
import Game from '../../components/game';

class Pacman extends Item implements GameBoardItem {

  type:GameBoardItemType = GameBoardItemType.PACMAN;

  desiredMove: string | false = false;

  score:number = 0;

  automate:boolean = false;
  automateMoves:number = 100;

  decisionTree:DecisionTree;

  constructor(piece:GameBoardPiece, items:GameBoardItem[][], pillTimer:GameBoardItemTimer) {
    super(piece, items, pillTimer);

    // Bind context for callback events
    this.handleKeyPress = this.handleKeyPress.bind(this);

    // Add a listener for keypresses for this object
    window.addEventListener('keypress', this.handleKeyPress, false);

    this.decisionTree = new DecisionTree(this);
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

    if (e.key.toUpperCase() == 'Q') {
      if(this.automate){
        this.automate = false;
      }else{
        this.automateMoves = 100;
        this.automate = true;
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

    // // If there is a keyboard move, use it and clear it
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

    //IF AI IS ON
    //If we are stopped (at a wall or start) pick random direction
    if(this.automate && this.automateMoves > 0)
    {
      if(this.direction == GameDirection.NONE) {
        move = {piece: this.piece, direction: Math.floor(Math.random() * 4)};
      }else{
        move = this.decisionTree.getMove();
      }
      this.automateMoves--;
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