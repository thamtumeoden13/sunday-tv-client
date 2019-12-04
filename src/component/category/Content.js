import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class CategoryTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // editorState: EditorState.createEmpty(),
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML('<p>My initial content.</p>')
                )
            )
        };
    }
    componentDidMount() {
        const { textEditor } = this.props.dataSource
        if (textEditor && textEditor.length > 0) {
            this.setState({
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(this.props.dataSource.textEditor)
                    )
                )
            })
        }
    }
    onEditorStateChange = (editorState) => {
        const convertHTML = stateToHTML(editorState.getCurrentContent())
        this.setState({ editorState })
        if (this.props.onChange) {
            this.props.onChange(this.props.name, { textEditor: convertHTML })
        }
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