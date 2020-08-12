import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Scores from './Scores'
import store from '../../redux/store';
import { initGame, resetScore, autoGame, addGamer } from '../../redux/actions';
import { GameSetUp } from '../../lib/Map';

interface ControlProps {
  score?: number;
  score2?: number;
  iteration?: number;
  runningScore?: number;
  runningScore2?: number;
  setup?: GameSetUp;
}
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginBottom: theme.spacing(1)
  }
}));

const Controls: React.FC<ControlProps> = ({ score, score2, iteration, runningScore, runningScore2, setup }): JSX.Element => {

  const styles = useStyles({});

  const handleNewGame = (): void => {
    store.dispatch(initGame());
  };

  const handleResetScore = (): void => {
    store.dispatch(resetScore());
  };

  const handleAutoGame = (): void => {
    store.dispatch(autoGame());
  };

  const handleTwoPlayers = (): void => {
    store.dispatch(addGamer());
  }

  return (
    <>
      <Scores score={score} score2={score2} runningScore={runningScore} runningScore2={runningScore2} iteration={iteration} setup={setup} />
      <Button onClick={handleTwoPlayers} className={styles.button} fullWidth variant="contained">{setup === GameSetUp.TWO_PLAYERS ? "One Player" : "Two Players"}</Button>
      <Button onClick={handleAutoGame} className={styles.button} fullWidth variant="contained">AutoPlay</Button>
      <Button onClick={handleNewGame} className={styles.button} fullWidth color="primary" variant="contained">New Game</Button>
      <Button onClick={handleResetScore} className={styles.button} fullWidth variant="contained">Reset Score</Button>
    </>
  );
};

export default Controls;