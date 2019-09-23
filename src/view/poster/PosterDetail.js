import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Tabs from '../../component/common/tab/Tabs';
import { TabCatalogConfig } from '../../constant/TabConfig'
import SignIn from '../../component/SignIn'

const useStyles = makeStyles(theme => ({

}));

const PosterScreen = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.root}>
                        <Tabs
                            listTab={TabCatalogConfig}
                        >
                            <Typography component="h1" variant="h5">
                                Sign up1
                            </Typography>
                            <Typography component="h1" variant="h5">
                                Sign up2
                            </Typography>
                            <SignIn />
                        </Tabs>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}
export default PosterScreen;