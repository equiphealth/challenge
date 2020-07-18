export enum ActionTypes {
  SET_ITEMS = 0,
  TIC = 1,
  INIT = 2,
  RESET = 3,
  INITAUTO = 4,
}

export const initGame = () => ({
  type: ActionTypes.INIT,
  payload: {},
});

export const initAutoGame = () => ({
  type: ActionTypes.INITAUTO,
  payload: {},
});

export const resetScore = () => ({
  type: ActionTypes.RESET,
  payload: {},
});

export const setItems = (items: GameBoardItem[][]) => ({
  type: ActionTypes.SET_ITEMS,
  payload: {
    items,
  },
});

export const tic = () => ({
  type: ActionTypes.TIC,
  payload: {},
});
