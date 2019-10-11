import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

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
        // maxWidth: '50%'
    },
    root: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        width: '50%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CategoryEditContent = (props) => {
    const classes = useStyles();
    const [publish, setPublished] = useState(!props.publish ? false : props.publish);
    const [state, setState] = React.useState({
        dioceseName: '',
        dioceseShortName: ''
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });

    };

    const onChangePublished = () => {
        setPublished(!publish)
    }

    useEffect(() => {
        setState({
            dioceseName: props.dioceseName ? props.dioceseName : '',
            dioceseShortName: props.dioceseShortName ? props.dioceseShortName : '',
        });
    }, [])

    useEffect(() => {
        setPublished(!props.publish ? false : props.publish)
    }, [props.publish])

    return (
        <div className={classes.paper}>
            <CssBaseline />
            <Grid container component="main" spacing={2} className={classes.root} >
                <Grid item xs={12}>
                    <TextField
                        name="dioceseId"
                        variant="outlined"
                        required
                        fullWidth
                        id="dioceseId"
                        label="Mã Giáo Phận(Tự động)"
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="dioceseName"
                        label="Tên Giáo Phận"
                        name="dioceseName"
                        autoFocus
                        onChange={(event) => handleChange(event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="dioceseShortName"
                        label="Tên rút gọn"
                        name="dioceseShortName"
                        onChange={(event) => handleChange(event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox value={publish} checked={publish}
                                color="primary" name="published" id="published"
                                onChange={() => onChangePublished()}
                            />}
                        label="Công khai"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default CategoryEditContent;