import { ActionTypes } from '../actions';
import { InitializeGame, InitializeCheatGame } from '../../lib/Game';
import { GameBoardItemType, GameMode, CheatMode } from '../../lib/Map';

/** Holds initial state */
const initialState:GameState = {...InitializeGame(), runningScore: 0, iteration: 0};

const gameReducer = (state:GameState = initialState, action: ReduxAction): GameState => {
  const { items, GhostStore, PacmanStore, pillTimer} = state;
  let { mode, runningScore, iteration, turn } = state;


  let newMove; let i;

  switch (action.type) {

    case ActionTypes.INIT:
      runningScore += PacmanStore.score;
      iteration = (iteration || 0) + 1;
      return {...InitializeGame(), runningScore, iteration};

    case ActionTypes.RESET:
      runningScore = 0;
      iteration = 0;
      return {...InitializeGame(), runningScore, iteration};

    case ActionTypes.SET_ITEMS:
      return {...state, ...action.payload };

    case ActionTypes.TIC:
      // if you're in cheat mode and it's done, run it again
      if (mode === GameMode.FINISHED && state.cheatMode === CheatMode.ON && iteration && iteration < 100) {

        // same as content of INIT_CHEAT
        runningScore += PacmanStore.score;
        iteration = (iteration || 0) + 1;
        return {...InitializeCheatGame(), runningScore, iteration};
      } if (mode === GameMode.PLAYING) {

        turn += 1;

        // Move Pacman
        newMove = PacmanStore.getNextMove();
        if (newMove) {
          if (items[newMove.piece.y][newMove.piece.x].type === GameBoardItemType.GHOST && pillTimer.timer === 0) {
            mode = GameMode.FINISHED;
          } else {
            PacmanStore.move(newMove.piece, newMove.direction);
          }
        } else {
          PacmanStore.setDirection();
        }

        // Move Ghosts
        if (turn % 2 || (pillTimer.timer === 0)) {
          for (i = 0; i < GhostStore.length; i += 1) {
            newMove = GhostStore[i].getNextMove();
            if (newMove) {
              if (items[newMove.piece.y][newMove.piece.x].type === GameBoardItemType.PACMAN) {
                if (pillTimer.timer === 0) {
                  GhostStore[i].move(newMove.piece, newMove.direction);
                  mode = GameMode.FINISHED;
                } else {
                  GhostStore[i].setDirection();
                }
              } else {
                GhostStore[i].move(newMove.piece, newMove.direction);
              }
            } else {
              GhostStore[i].setDirection();
            }
          }
        }

        // Decrement Pill counter
        if (pillTimer.timer > 0) pillTimer.timer -= 1;

      }
      return {...state, items, mode, turn };

    case ActionTypes.INIT_CHEAT:
      runningScore += PacmanStore.score;
      iteration = (iteration || 0) + 1;
      return {...InitializeCheatGame(), runningScore, iteration};

    default:
      return state;
  }
};

export default gameReducer;