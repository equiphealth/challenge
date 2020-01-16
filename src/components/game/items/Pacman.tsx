/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Pacman from '../../common/Pacman';

interface ItemProps {
  item: GameBoardItem;
}

const useStyles = makeStyles(() => ({
  base: {
    height: 15,
    width: 15,
    color: '#dd0',
  },
  '@keyframes blinker': {
    from: {color: '#fff'},
    to: {color: '#dd0'}
  },
  super: {
    animationName: '$blinker',
    animationDuration: '.5s',
    animationTimingFunction: 'linear',
    animationIterationCount:'infinite',
  }
}));

const Item: React.FC<ItemProps> = ({item}): JSX.Element => {
  
  const styles = useStyles({});

  return (
    <Pacman className={classNames(styles.base, typeof item.pillTimer !== 'undefined' && item.pillTimer.timer > 0 ? styles.super : null)} />
  );
};

export default Item;