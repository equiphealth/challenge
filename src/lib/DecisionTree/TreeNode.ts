import Pacman from "../game/Pacman";

abstract class TreeNode {
   pacman:Pacman;

   constructor(pacman:Pacman) {
      this.pacman = pacman;
   }

   makeDecision() : TreeNode | undefined {
      return undefined;
   }

   getMove() : GameBoardItemMove | false {
      return false;
   }
}

export default TreeNode