import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Nav from './Nav';

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
}

const useStyles = makeStyles((theme: Theme) => ({
  window: {
    minHeight: '100vh',
    paddingTop: 64 + theme.spacing(2),
  },
}));

const Page: React.FC<PageProps> = ({
  children,
}): JSX.Element => {
  
  const styles = useStyles({});

  return (
    <>
      <Nav />
      <div className={styles.window}>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default Page;