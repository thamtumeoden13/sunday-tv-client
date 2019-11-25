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


class CategoryTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
            // ),
        };
    }
    componentDidMount() {
        this.setState({
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(this.props.dataSource.textEditor)
                )
            )
        })
    }
    onEditorStateChange = (editorState) => {
        const convertHTML = stateToHTML(editorState.getCurrentContent())
        console.log({ convertHTML })
        // this.setState({
        //     editorState: EditorState.createWithContent(
        //         ContentState.createFromBlockArray(
        //             convertFromHTML(convertHTML)
        //         )
        //     )

        // })
        this.setState({ editorState })
    }
    render() {
        return (
            <Fragment>
                <CssBaseline />
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </Fragment>
        )
    }
}
export default CategoryTextEditor;