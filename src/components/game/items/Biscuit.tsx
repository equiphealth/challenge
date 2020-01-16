/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface ItemProps {
  item: GameBoardItem;
}

const useStyles = makeStyles((theme) => ({
  base: {
    height: 7,
    width: 7,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.dark,
  },

}));

const Item: React.FC<ItemProps> = ({item}): JSX.Element => {
  
  const styles = useStyles({});

  return (
    <div className={styles.base} />
  );
};

export default Item;