import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { tic } from '../../redux/actions';
import GameBoard from './Board';
import { GameMode, GameSetUp } from '../../lib/Map';
import Controls from './Controls';

interface GameProps {
  dispatch: Function;
  layout?: GameBoardPiece[][];
  score?: number,
  score2?: number,
  mode?: GameMode,
  runningScore?: number,
  runningScore2?: number,
  iteration?: number
  setup?: GameSetUp 
};

const useStyles = makeStyles((theme: Theme) => ({
  base: {
    marginBottom: theme.spacing(2),
  },
}));

const Game: React.FC<GameProps> = ({ dispatch, layout, score, score2, runningScore, runningScore2, iteration, setup}): JSX.Element => {
  
  const styles = useStyles({});

  useEffect(() => {
    setInterval(() => {dispatch(tic());}, 250);
  }, [dispatch]);

  
  return (
    <Grid container alignContent="center" justify="center" className={styles.base} spacing={3}>
      <Grid item>
        <GameBoard boardState={layout}/>
      </Grid>
      <Grid item>
        <Controls score={score} score2={score2} runningScore={runningScore} runningScore2={runningScore2}  iteration={iteration} setup={setup} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: ReduxState): object => {
 
  const { layout, PacmanStore, PacmanStore2, runningScore, runningScore2, iteration, setup } = state.game;

  const score = typeof PacmanStore !== 'undefined' ? PacmanStore.score : 0;
  const score2 = typeof PacmanStore2 !== 'undefined' ? PacmanStore2.score2 : 0;


  return { layout, score, score2, runningScore, runningScore2, iteration, setup};
};

export default connect(mapStateToProps)(Game);