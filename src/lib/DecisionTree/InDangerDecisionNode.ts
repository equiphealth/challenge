import Pacman from "../game/Pacman";
import TreeNode from "./TreeNode";
import { GameBoardItemType, GameDirectionToKeys } from "../Map";

class InDangerDecisionNode extends TreeNode {

    daughterNodes:Map<boolean, TreeNode>;

    constructor(pacman: Pacman) {
        super(pacman);

        this.daughterNodes = new Map<boolean, TreeNode>();
    }

    makeDecision(): TreeNode | undefined {
        
        if(this.ghostFound()) {
            return this.daughterNodes.get(true);
        }
        return this.daughterNodes.get(false);
    }

    private ghostFound(): boolean {

        if(this.pacman.findItem(GameDirectionToKeys(this.pacman.direction), GameBoardItemType.GHOST)){
            return true;
        }
        return false;
    }
}

export default InDangerDecisionNode;