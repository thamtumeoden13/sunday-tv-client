import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Tabs from '../../component/common/tab/Tabs';
import { TabCatalogConfig } from '../../constant/TabConfig'

const useStyles = makeStyles(theme => ({

}));

const CatalogScreen = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.root}>
                        <Tabs
                            listTab={TabCatalogConfig}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}
export default CatalogScreen;