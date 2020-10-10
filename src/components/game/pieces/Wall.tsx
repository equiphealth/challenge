/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface PieceProps {
  piece: GameBoardPiece;
}

const useStyles = makeStyles((theme: Theme) => ({
  base: {
    height: 21,
    width: 21,
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Piece: React.FC<PieceProps> = ({ piece }): JSX.Element => {
  
  const styles = useStyles({});
  
  return (
    <div className={styles.base} />
  );
};

export default Piece;