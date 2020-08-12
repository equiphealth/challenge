export enum ActionTypes {
  SET_ITEMS = 0,
  TIC = 1,
  INIT = 2,
  RESET = 3,
  AUTO = 4,
  TWO_PLAYERS = 5
}

export const autoGame = () => ({
  type: ActionTypes.AUTO,
  payload: {}
});

export const initGame = () => ({
  type: ActionTypes.INIT,
  payload: {}
});

export const resetScore = () => ({
  type: ActionTypes.RESET,
  payload: {}
});

export const addGamer = () => ({
  type: ActionTypes.TWO_PLAYERS,
  payload: {}
});


export const setItems = (items:GameBoardItem[][]) => ({
  type: ActionTypes.SET_ITEMS,
  payload: {
    items
  }
});

export const tic = () => ({
  type: ActionTypes.TIC,
  payload: {}
});

