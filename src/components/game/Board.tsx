import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Wall, Empty } from './pieces';
import { GameBoardPieceType } from '../../lib/Map';

interface BoardProps {
  boardState?: GameBoardPiece[][];
}

const Board: React.FC<BoardProps> = ({boardState}): JSX.Element => {
  
  return (
    <>
      {typeof boardState === 'undefined' ? null : boardState.map((row, y) => {
        const idx = `ROW::${y}`;
        return (
          <Grid container item key={idx} alignContent="center" justify="center">
            {row.map(piece => {
              switch(piece.type) {
                case GameBoardPieceType.WALL:
                  return <Grid key={piece.id}><Wall piece={piece} /></Grid>;
                default: 
                  return <Grid key={piece.id}><Empty piece={piece} /></Grid>;
              };
            })}
          </Grid>
        );
      }
      )}
    </>
  );
};

export default Board;