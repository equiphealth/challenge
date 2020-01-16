import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import Gear from '../common/Gear';

interface NavProps {
}

const useStyles = makeStyles((theme: Theme) => ({
  gear: {
    marginRight: theme.spacing(1),
  },
}));

const Nav: React.FC<NavProps> = (): JSX.Element => {

  const styles = useStyles({});

  return (
    <AppBar color="primary">
      <Toolbar>
        <Gear className={styles.gear} />
        <TypoGraphy variant="h6" color="inherit">
          equip pac-man
        </TypoGraphy>
        <Box flexGrow={1} mx={4} />
        <Box />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
