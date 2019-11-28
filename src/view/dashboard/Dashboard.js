import React, { Fragment, useEffect } from 'react';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { connect } from "react-redux";
import { setPagePath } from "../../actions/pageInfos";

import { DASHBOARD } from '../../constant/breadcrumbsConfig'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
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
const DashBoardScreen = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        props.setPagePath(DASHBOARD.search)
    }, [])

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        {/* <Chart /> */}
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        {/* <Deposits /> */}
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {/* <Orders /> */}
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
// export default DashBoardScreen;