import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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

const DioceseCom = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        id: '',
        name: '',
        shortName: '',
        published: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        if (props.onChange) {
            props.onChange(event.target.name, event.target.value)
        }
    }

    const handleChangeCheckbox = (event) => {
        setState({ ...state, [event.target.name]: !state[event.target.name] });
        if (props.onChange) {
            props.onChange(event.target.name, !state[event.target.name])
        }
    }

    useEffect(() => {
        if (props.diocese) {
            setState({
                id: props.diocese.id ? props.diocese.id : '',
                name: props.diocese.name ? props.diocese.name : '',
                shortName: props.diocese.shortName ? props.diocese.shortName : '',
                published: props.diocese.published ? props.diocese.published : false,
            })
        }
    }, [props.diocese])

    return (
        <div className={classes.paper}>
            <CssBaseline />
            <Grid container component="main" spacing={2} className={classes.root} >
                <Grid item xs={12}>
                    <TextField
                        name="id"
                        variant="outlined"
                        required
                        fullWidth
                        id="id"
                        label="Mã Giáo Phận(Tự động)"
                        disabled
                        value={state.id}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Tên Giáo Phận"
                        name="name"
                        autoFocus
                        value={state.name}
                        onChange={(event) => handleChange(event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="shortName"
                        label="Tên rút gọn"
                        name="shortName"
                        value={state.shortName}
                        onChange={(event) => handleChange(event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox value={state.published} checked={state.published}
                                color="primary" name="published" id="published"
                                onChange={(event) => handleChangeCheckbox(event)}
                            />}
                        label="Công khai"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default DioceseCom;