import { GameBoardItemType, GhostColor, GameDirection, pillMax, GameDirectionMap, GameDirectionReverseMap } from '../Map';
import Item from './Item';

class Ghost extends Item implements GameBoardItem {

  type:GameBoardItemType = GameBoardItemType.GHOST;

  pursuit: string | boolean = false;

  color?:GhostColor;

  startPoints: GameBoardPiece[];

  timeout: GameBoardItemTimer;

  constructor(piece:GameBoardPiece, items:GameBoardItem[][], pillTimer:GameBoardItemTimer, GhostStartPoints: GameBoardPiece[], color?:GhostColor) {
    super(piece, items, pillTimer);

    this.color = color;
    this.startPoints = GhostStartPoints;

    this.timeout = { timer: 0 };

  }

  /**
   * Returns the next move from an algorithm
   * 
   * @method getNextMove
   * @return {GameBoardItemMove | boolean} Next move
   */
  getNextMove(): GameBoardItemMove | boolean {

    const { moves } = this.piece;

    let dangerSeen:boolean = false;

    let reversePiece:GameBoardPiece = this.piece;
    let reverseDirection:string = GameDirectionMap[this.direction];

    const newMoves:GameBoardItemMoves = {};

    // Is this character in timeout?
    if (this.timeout.timer > 0) {
      this.timeout.timer -= 1;
      return false;
    }

    for (const idx in moves) {
      if (idx) {
        const move = moves[idx];
        if (this.items[move.y][move.x].type !== GameBoardItemType.GHOST) {
          const pacman = this.findItem(idx, GameBoardItemType.PACMAN);
          let dangerAhead = false;

          // Check if pacman is ahead and dangerous
          if (pacman && typeof pacman.pillTimer !== 'undefined' && pacman.pillTimer.timer > 0) {
            dangerAhead = true;  
            dangerSeen = true;
          }

          // Persue Pacman
          if (pacman && !dangerAhead) {
            this.pursuit = idx;
            return {piece: move, direction: GameDirectionMap[idx] };
          }

          // If there is no danger ahead, and we aren't going backwards
          if (!dangerAhead && GameDirectionMap[GameDirectionReverseMap[idx]] !== this.direction) {
            newMoves[idx] = move;
          } else if (GameDirectionMap[GameDirectionReverseMap[idx]] === this.direction) {
            reversePiece = move;
            reverseDirection = idx;
          }
        }
      }
    }

    if (dangerSeen) {
      newMoves[reverseDirection] = reversePiece;
    }

    const newMovesIdx = Object.keys(newMoves);

    if (newMovesIdx.length < 1) return false;

    // Increase chance of moving where pacman was previously seen
    if (this.pursuit && newMovesIdx.length > 1) {
      if (newMovesIdx.indexOf(this.pursuit.toString()) !== -1) {
        newMovesIdx.push(this.pursuit.toString());
      }
      this.pursuit = false;
    }

    const move = Math.floor(Math.random() * newMovesIdx.length);

    return {piece: newMoves[newMovesIdx[move]], direction: GameDirectionMap[newMovesIdx[move]]};

  }

  /**
   * Sends the Ghost back to a start point to wait
   * 
   * @method gotoTimeout
   */
  gotoTimeout(): void {
    this.timeout.timer = pillMax;
    for (let x = 0; x < this.startPoints.length; x += 1) {
      if (this.items[this.startPoints[x].y][this.startPoints[x].x].type !== GameBoardItemType.GHOST) {
        this.move(this.startPoints[x], GameDirection.NONE);
      }
    }
  }

}

export default Ghost;