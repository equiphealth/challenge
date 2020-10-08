import TreeNode from "./TreeNode";
import { GameBoardItemType, GameDirectionToKeys } from "../Map";

class SearchForDotActionNode extends TreeNode {

    getMove(): GameBoardItemMove | false {

        let currentDirection = this.pacman.direction;
        let right = (this.pacman.direction - 1) % 4;
        let left = (this.pacman.direction + 1) % 4;

        let directionsToLook = [currentDirection, left, right];

        for (const dir of directionsToLook) {
            if(this.pacman.findItem(GameDirectionToKeys(this.pacman.direction), GameBoardItemType.BISCUIT)){
                const key = GameDirectionToKeys(dir)
                if (this.pacman.piece.moves[key]) {
                    let move = {piece: this.pacman.piece.moves[key], direction: dir};
                    return move;
                }
            }
        }

        const key = GameDirectionToKeys(this.pacman.direction);
        if (this.pacman.piece.moves[key]) {
            let move = {piece: this.pacman.piece.moves[key], direction: this.pacman.direction};
            return move;
        }
       return false;
    }
}

export default SearchForDotActionNode;