import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import store from '../../redux/store';
import { initGame, resetScore, initCheatGame, tic } from '../../redux/actions';

interface ControlProps {
  score?: number;
  iteration?: number;
  runningScore?: number;
  dispatch: Function;
}

const useStyles = makeStyles((theme: Theme) => ({
  score: {
    color: '#dd0',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(1)
  }
}));

const Controls: React.FC<ControlProps> = ({score, iteration, runningScore, dispatch}): JSX.Element => {
  // ticSpeed state to change state based on game mode
  const [ticSpeed, setTicSpeed] = useState(250);
  const styles = useStyles({});

  // use variable to setInterval so it can be cleared on unmount to go back to regular tick 250 after cheating
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tic());
    }, ticSpeed);
    return () => clearInterval(interval);
  }, [dispatch, ticSpeed]);
  

  const handleNewGame = ():void => {
    setTicSpeed(250);
    store.dispatch(initGame());
  };

  const handleResetScore = ():void => {
    setTicSpeed(250);
    store.dispatch(resetScore());
  };

  const handleCheatGame = ():void => {
    setTicSpeed(100);
    store.dispatch(initCheatGame());
  };

  return (
    <>
      <div className={styles.score}>
        <Typography variant="body1">
          <b>Score:</b> 
          {' '}
          {score || 0}
        </Typography>
        <Typography variant="body1">
          <b>Total Score:</b> 
          {' '}
          {runningScore || 0}
        </Typography>
        <Typography variant="body1">
          <b>Iteration:</b> 
          {' '}
          {iteration || 1 }
        </Typography>
      </div>

      <Button onClick={handleNewGame} className={styles.button} fullWidth color="primary" variant="contained">New Game</Button>
      <Button onClick={handleResetScore} className={styles.button} fullWidth variant="contained">Reset Score</Button>
      <Button onClick={handleCheatGame} className={styles.button} fullWidth variant="contained">Cheat</Button>
    </>
  );
};

export default Controls;