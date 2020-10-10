/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cherry from '../../common/Cherry';

interface ItemProps {
  item: GameBoardItem;
}

const useStyles = makeStyles(() => ({
  base: {
    height: 15,
    width: 15,
    color: '#a00',
  },

}));

const Item: React.FC<ItemProps> = ({item}): JSX.Element => {
  
  const styles = useStyles({});

  return (
    <Cherry className={styles.base} />
  );
};

export default Item;