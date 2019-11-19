import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import Tabs from '../../component/common/tab/Tabs';
import { TabCategoryConfig } from '../../constant/TabConfig'
import DetailComponent from '../../component/category/edit/Detail'
import ContentComponent from '../../component/category/edit/UpdateImages'
import TextEditorComponent from '../../component/category/edit/Content'

import { connect } from "react-redux";
import { setPagePath } from "../../actions/pageInfos";

import { CATEGORY } from '../../constant/BreadcrumbsConfig'

const useStyles = makeStyles(theme => ({
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
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

const CategoryEdit = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.setPagePath(CATEGORY.edit)
    }, [])

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Tabs
                            listTab={TabCategoryConfig}
                        >
                            <DetailComponent />
                            <TextEditorComponent />
                            <ContentComponent />
                        </Tabs>
                        <div className={classes.buttons}>
                            <Button variant="contained" className={classes.button}>
                                <SaveIcon className={clsx(classes.leftIcon)} />
                                Save
                            </Button>
                            <Button variant="outlined" color="secondary" className={classes.button}>
                                Delete
                                <DeleteIcon className={classes.rightIcon} />
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);