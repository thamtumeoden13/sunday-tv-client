import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import Tabs from '../../component/common/tab/Tabs';
import { TabCategoryConfig } from '../../constant/TabConfig'
import CategoryAddComponent from '../../component/category/CategoryAdd'
import CategoryAddContentComponent from '../../component/category/CategoryAddContent'

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

const CategoryAdd = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Tabs
                            listTab={TabCategoryConfig}
                        >
                            <CategoryAddComponent />
                            <Editor
                                // editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                            // onEditorStateChange={this.onEditorStateChange}
                            />
                            <CategoryAddContentComponent />
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
export default CategoryAdd;