import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { GameSetUp } from '../../lib/Map';


interface ControlProps {
    score?: number;
    iteration?: number;
    runningScore?: number;
    score2?: number;
    runningScore2?: number;
    setup?: GameSetUp ;
}

const useStyles = makeStyles((theme: Theme) => ({
    score: {
        color: '#dd0',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    }
}));

const Controls: React.FC<ControlProps> = ({ score, iteration, runningScore, score2, runningScore2, setup }): JSX.Element => {
    const styles = useStyles({});

    if (setup === GameSetUp.TWO_PLAYERS) {
        return (
            <>
                <Box display="flex"  >
                    <div className={styles.score}>
                        <Typography variant="body1">
                            <b>Score:</b>
                            {' '}
                            {score || 0}
                        </Typography>
                        <Typography variant="body1">
                            <b>Total Score:</b>
                            {' '}
                            {runningScore || 0}
                        </Typography>
                        <Typography variant="body1">
                            <b>Iteration:</b>
                            {' '}
                            {iteration || 1}
                        </Typography>
                    </div>
                    <div className={styles.score}>
                        <Typography variant="body1">
                            <b>Score:</b>
                            {' '}
                            {score2 || 0}
                        </Typography>
                        <Typography variant="body1">
                            <b>Total Score:</b>
                            {' '}
                            {runningScore2 || 0}
                        </Typography>
                    </div>
                </Box>
            </>
        );
    } if (setup === GameSetUp.ONE_PLAYER) {
        return (
            <>
                <div className={styles.score}>
                    <Typography variant="body1">
                        <b>Score:</b>
                        {' '}
                        {score || 0}
                    </Typography>
                    <Typography variant="body1">
                        <b>Total Score:</b>
                        {' '}
                        {runningScore || 0}
                    </Typography>
                    <Typography variant="body1">
                        <b>Iteration:</b>
                        {' '}
                        {iteration || 1}
                    </Typography>
                </div>
            </>
        )
    }
    throw new Error("Should not read this");
};

export default Controls;