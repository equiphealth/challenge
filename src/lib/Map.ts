
export enum GameDirection {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
  NONE = 4,
}

export const KeyToGameDirection:KeyToGameDirection = {
  W: 'up',
  S: 'down',
  A: 'left',
  D: 'right',
};

const GameDirectionToKeys = (direction: GameDirection): string => {

  switch (direction) {
    case GameDirection.UP: return 'up';
    case GameDirection.DOWN: return 'down';
    case GameDirection.LEFT: return 'left';
    case GameDirection.RIGHT: return 'right';
    default: return 'none';
  }
};

export { GameDirectionToKeys };

export const GameDirectionMap:GameDirectionMap = {
  up: GameDirection.UP,
  down: GameDirection.DOWN,
  left: GameDirection.LEFT,
  right: GameDirection.RIGHT,
  none: GameDirection.NONE,
};

export const GameDirectionReverseMap:GameDirectionMap = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
  none: 'none',
};
    
export enum GameBoardPieceType {
  WALL = 0,
  EMPTY = 1,
}
    
export enum GameBoardItemType {
  EMPTY = 0,
  PACMAN = 1,
  BISCUIT = 10,
  PILL = 100,
  GHOST = 200,
}

export enum GameBoardPieceDirection {
  UP = 1,
  LEFT = 2,
  DOWN = 3,
  RIGHT = 4,
}

export enum GameMode {
  WAITING = 0,
  PLAYING = 1,
  FINISHED = 2  
}

export enum GhostColor {
  BLUE = '#00C',
  ORANGE = '#C80',
  RED = '#C00',
  VIOLET = '#C08'
}

export const pillMax = 30;