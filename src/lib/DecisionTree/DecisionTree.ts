import Pacman from '../game/Pacman';
import InDangerDecisionNode from './InDangerDecisionNode';
import RunAwayActionNode from './RunAwayActionNode';
import SearchForDotActionNode from './SearchForDotActionNode';

class DecisionTree {

    private pacman:Pacman;
    private rootNode:InDangerDecisionNode;

    constructor(pacman:Pacman) {
        this.pacman = pacman;

        this.rootNode = new InDangerDecisionNode(this.pacman);
        this.rootNode.daughterNodes.set(true, new RunAwayActionNode(this.pacman));
        this.rootNode.daughterNodes.set(false, new SearchForDotActionNode(this.pacman));
    }

    getMove(): GameBoardItemMove | false {
        let move = this.rootNode.makeDecision()?.getMove();
        if( !move )
            return false;

        return move;
    }
}

export default DecisionTree;