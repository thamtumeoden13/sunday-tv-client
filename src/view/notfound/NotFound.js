import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

const useStyles = makeStyles(theme => ({

}));

const NotFoundScreen = (props) => {
    const classes = useStyles();
    // console.log({ props });
    return (
        <Fragment>
            <CssBaseline />
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" color="error">
                    Page Not Found
                </Typography>
                <Link to='/' style={{ color: 'grey' }} >
                    <Typography component="h1" variant="h5">
                        Back To Home <KeyboardReturn style={{ fontSize: 20 }} />
                    </Typography>
                </Link>
            </Grid>
        </Fragment>
    );
}
export default NotFoundScreen;