/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Tabs from '../../component/common/tab/Tabs';
import { TabCatalogConfig } from '../../constant/TabConfig'
import SignIn from '../../component/SignIn'

import { connect } from "react-redux";
import { setPagePath } from "../../actions/pageInfos";

import { POSTER } from '../../constant/BreadcrumbsConfig'

const useStyles = makeStyles(theme => ({

}));

const mapStateToProps = state => {
    return {
        PageInfos: state.PageInfosModule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setPagePath: pagePath => {
            dispatch(setPagePath(pagePath));
        },
    };
};

const PosterScreen = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.setPagePath(POSTER.view)
    }, [])
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
export default connect(mapStateToProps, mapDispatchToProps)(PosterScreen);