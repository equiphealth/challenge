import { GameDirectionToKeys, ReverseGameDirectionToKeys } from '../Map';
import TreeNode from './TreeNode';


class RunAwayActionNode extends TreeNode {

    getMove(): GameBoardItemMove | false {
        //Change to opposite direction
        const key = GameDirectionToKeys(this.pacman.direction);
        if (this.pacman.piece.moves[key]) {
            let move = {piece: this.pacman.piece.moves[key], direction: ReverseGameDirectionToKeys(this.pacman.direction)};
            
            return move;
        }
        return false;
    }
}

export default RunAwayActionNode;