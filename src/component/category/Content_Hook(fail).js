import React, { Fragment, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const CategoryTextEditor = (props) => {
    const classes = useStyles();
    const [editorState, setEditorState] = React.useState({
        editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML('<p>My initial content.</p>')
            )
        )
    })

    const onEditorStateChange = (editorState) => {
        const convertHTML = stateToHTML(editorState.getCurrentContent())
        setEditorState(convertHTML)
        if (props.onChange)
            props.onChange(convertHTML)
    }
    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.paper}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
                />
            </div>
        </Fragment>
    );
}
export default CategoryTextEditor;