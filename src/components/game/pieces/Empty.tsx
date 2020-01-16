/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Biscuit, Pill, Ghost, Pacman } from '../items';
import { GameBoardItemType } from '../../../lib/Map';

interface PieceProps {
  piece: GameBoardPiece;
  item?: GameBoardItem;
}

const useStyles = makeStyles(() => ({
  base: {
    height: 21,
    width: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const renderContents = (item: GameBoardItem): JSX.Element | null => {
  switch (item.type) {
    case GameBoardItemType.BISCUIT :
      return <Biscuit item={item} />;
    case GameBoardItemType.PILL :
      return <Pill item={item} />;
    case GameBoardItemType.GHOST :
      return <Ghost item={item} />;
    case GameBoardItemType.PACMAN :
      return <Pacman item={item} />;
    default: return null;
  }
};

const Piece: React.FC<PieceProps> = ({ piece, item }): JSX.Element => {
  
  const styles = useStyles({});
  
  return (
    <div className={styles.base}>
      {typeof item !== 'undefined' ? renderContents(item) : null}
    </div>
  );
};

const mapStateToProps = (state:ReduxState, props:PieceProps): object => {

  const item:GameBoardItem = state.game.items[props.piece.y][props.piece.x];

  return { item };
};

export default connect(mapStateToProps)(Piece);