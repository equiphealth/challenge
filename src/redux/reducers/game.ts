import { ActionTypes } from '../actions';
import { InitializeGame } from '../../lib/Game';
import { GameBoardItemType, GameMode, GameSetUp } from '../../lib/Map';

/** Holds initial state */
const initialState: GameState = { ...InitializeGame(false, false), runningScore: 0, runningScore2: 0, iteration: 0 };

const gameReducer = (state: GameState = initialState, action: ReduxAction): GameState => {
  const { items, GhostStore, PacmanStore, PacmanStore2, pillTimer } = state;
  let { mode, runningScore, runningScore2, iteration, turn, setup } = state;

  let newMove; let i; let newMove2;

  switch (action.type) {

    case ActionTypes.INIT:
      if (setup === GameSetUp.TWO_PLAYERS) {
        runningScore = 0;
        runningScore2 = 0;
        iteration = 1;
        return { ...InitializeGame(false, true), runningScore, runningScore2, iteration };
      } else {
        runningScore = 0;
        iteration = 1;
        return { ...InitializeGame(false, false), runningScore, runningScore2, iteration };
      }

    case ActionTypes.RESET:
      if (setup === GameSetUp.TWO_PLAYERS) {
        runningScore = 0;
        runningScore2 = 0;
        iteration = 0;
        return { ...InitializeGame(false, true), runningScore, runningScore2, iteration };
      } else {
        runningScore = 0;
        iteration = 0;
        return { ...InitializeGame(false, false), runningScore, runningScore2, iteration };
      }


    case ActionTypes.AUTO:
      runningScore = 0;
      iteration = 1;
      return { ...InitializeGame(true, false), runningScore, runningScore2, iteration };

    case ActionTypes.SET_ITEMS:
      return { ...state, ...action.payload };

    case ActionTypes.TWO_PLAYERS:
      if (setup === GameSetUp.TWO_PLAYERS) {
        runningScore = 0;
        runningScore2 = 0;
        iteration = 1;
        return { ...InitializeGame(false, false), runningScore, runningScore2, iteration };
      } else if (setup === GameSetUp.ONE_PLAYER) {
        runningScore = 0;
        runningScore2 = 0;
        iteration = 1;
        return { ...InitializeGame(false, true), runningScore, runningScore2, iteration };
      }


    case ActionTypes.TIC:

      if (mode === GameMode.PLAYING && setup === GameSetUp.TWO_PLAYERS) {
        turn += 1;
        newMove = PacmanStore.getNextMove();
        newMove2 = PacmanStore2.getNextMove2();
        if (newMove || newMove2) {
          if (newMove) {
            if (items[newMove.piece.y][newMove.piece.x].type === GameBoardItemType.GHOST && pillTimer.timer === 0) {
              mode = GameMode.FINISHED;
              runningScore += PacmanStore.score;
              runningScore2 += PacmanStore2.score2;
              iteration = (iteration || 0) + 1;
              return { ...InitializeGame(false, true), runningScore, runningScore2, iteration };
            } else {
              PacmanStore.move(newMove.piece, newMove.direction);
            }
          } else {
            PacmanStore.setDirection();
          }
          if (newMove2) {
            if (items[newMove2.piece.y][newMove2.piece.x].type === GameBoardItemType.GHOST && pillTimer.timer === 0) {
              mode = GameMode.FINISHED;
              runningScore += PacmanStore.score;
              runningScore2 += PacmanStore2.score2;
              iteration = (iteration || 0) + 1;
              return { ...InitializeGame(false, true), runningScore, runningScore2, iteration };
            } else {
              PacmanStore2.move2(newMove2.piece, newMove2.direction);
            }
          } else {
            PacmanStore2.setDirection();
          }
        }
        // Move Ghosts
        if (turn % 2 || (pillTimer.timer === 0)) {
          for (i = 0; i < GhostStore.length; i += 1) {
            newMove = GhostStore[i].getNextMove();
            if (newMove) {
              if (items[newMove.piece.y][newMove.piece.x].type === GameBoardItemType.PACMAN || items[newMove.piece.y][newMove.piece.x].type === GameBoardItemType.PACMAN2) {
                if (pillTimer.timer === 0) {
                  GhostStore[i].move(newMove.piece, newMove.direction);
                  mode = GameMode.FINISHED;
                  runningScore += PacmanStore.score;
                  runningScore2 += PacmanStore2.score2;
                  iteration = (iteration || 0) + 1;
                  return { ...InitializeGame(false, true), runningScore, runningScore2, iteration };
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




      if (setup === GameSetUp.ONE_PLAYER) {
        if (mode === GameMode.PLAYING || mode === GameMode.AUTO) {
          turn += 1;
          mode === GameMode.PLAYING ? newMove = PacmanStore.getNextMove() : newMove = PacmanStore.getAutoMove()
          // Move Pacman
          if (newMove) {
            if (items[newMove.piece.y][newMove.piece.x].type === GameBoardItemType.GHOST && pillTimer.timer === 0) {
              if (mode === GameMode.AUTO) {
                mode = GameMode.FINISHED;
                if (iteration !== undefined && iteration < 100) {
                  iteration += 1;
                  runningScore += PacmanStore.score;
                  return { ...InitializeGame(true, false), runningScore, runningScore2, iteration };
                }
                iteration = 0;
                return { ...InitializeGame(true, false), runningScore, runningScore2, iteration };
              } else {
                mode = GameMode.FINISHED;
                iteration = (iteration || 0) + 1;
                runningScore += PacmanStore.score;
                return { ...InitializeGame(false, false), runningScore, runningScore2, iteration };
              }
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
                    if (mode === GameMode.AUTO) {
                      mode = GameMode.FINISHED;
                      if (iteration !== undefined && iteration < 100) {
                        iteration += 1;
                        runningScore += PacmanStore.score;
                        return { ...InitializeGame(true, false), runningScore, runningScore2, iteration };
                      }
                      iteration = 0;
                      return { ...InitializeGame(true, false), runningScore, runningScore2, iteration };
                    } else {
                      mode = GameMode.FINISHED;
                      iteration = (iteration || 0) + 1;
                      runningScore += PacmanStore.score;
                      return { ...InitializeGame(false, false), runningScore, runningScore2, iteration };
                    }
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
      }
      return { ...state, items, mode, turn };

    default:
      return state;
  }
};

export default gameReducer;