/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Ghost from '../../common/Ghost';
import { GhostColor } from '../../../lib/Map';

interface ItemProps {
  item: GameBoardItem;
}

const useStyles = makeStyles(() => {
  const base = {
    height: 15,
    width: 15
  };

  return {
    red: {
      ...base,
      color: GhostColor.RED
    },
    blue: {
      ...base,
      color: GhostColor.BLUE
    },
    orange: {
      ...base,
      color: GhostColor.ORANGE
    },
    violet: {
      ...base,
      color: GhostColor.VIOLET
    },
    '@keyframes blinker': {
      from: {opacity: 1},
      to: {opacity: 0}
    },
    scared: {
      animationName: '$blinker',
      animationDuration: '1s',
      animationTimingFunction: 'linear',
      animationIterationCount:'infinite',
    }
  };
});

const Item: React.FC<ItemProps> = ({item}): JSX.Element => {
  
  const styles = useStyles({});

  let mainStyle = styles.red;
  switch (item.color) {
    case GhostColor.BLUE:
      mainStyle = styles.blue;
      break;    
    case GhostColor.ORANGE:
      mainStyle = styles.orange;
      break;    
    case GhostColor.VIOLET:
      mainStyle = styles.violet;
      break;

    default: break;
  }

  return (
    <Ghost className={classNames(mainStyle, typeof item.pillTimer !== 'undefined' && item.pillTimer.timer > 0 ? styles.scared : null)} />
  );
};

export default Item;