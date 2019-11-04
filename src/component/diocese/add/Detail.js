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

const DioceseAddDetail = (props) => {
    const classes = useStyles();
    // const [publish, setPublished] = useState(!props.publish ? false : props.publish);
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
    };
    // const onChangePublished = () => {
    //     setPublished(!publish)
    // }

    // useEffect(() => {
    //     setPublished(!props.publish ? false : props.publish)
    // }, [props.publish])

    return (
        <div className={classes.paper}>
            <CssBaseline />
            <Grid container component="main" spacing={2} className={classes.root} >
                <Grid item xs={12}>
                    <TextField
                        // required
                        fullWidth
                        name="id"
                        id="id"
                        variant="outlined"
                        label="Mã Giáo Phận(Tự động)"
                        value={state.id}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        autoFocus
                        id="name"
                        name="name"
                        variant="outlined"
                        label="Tên Giáo Phận"
                        value={state.name}
                        onChange={(event) => handleChange(event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="shortName"
                        name="shortName"
                        variant="outlined"
                        label="Tên rút gọn"
                        value={state.shortName}
                        onChange={(event) => handleChange(event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={state.published} checked={state.published} color="primary"
                                name="published" id="published"
                                onChange={(event) => handleChange(event)}
                            />}
                        label="Công khai"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default DioceseAddDetail;