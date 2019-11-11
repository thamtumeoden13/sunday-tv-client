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

const DeaneryAddDetail = (props) => {
    const classes = useStyles();
    const [dioceses, setDioceses] = useState([]);
    const [state, setState] = React.useState({
        id: '',
        name: '',
        shortName: '',
        dioceseId: '',
        published: false
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        if (props.onChange) {
            props.onChange(event.target.name, event.target.value)
        }
    };

    const renderOption = (listOption) => {
        return (
            listOption.map((e, i) => {
                return <MenuItem value={e.id} key={i}>{e.name}</MenuItem>
            })
        )
    }
    useEffect(() => {
        setDioceses(props.dioceses ? props.dioceses : [])
    }, [props.dioceses])

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
                        label="Mã Giáo Hạt(Tự động)"
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
                        label="Tên Giáo Hạt"
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
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="dioceseId"
                        label="Giáo Phận"
                        select={true}
                        value={state.dioceseId}
                        onChange={(event) => handleChange(event)}
                    >
                        {dioceses && dioceses.length > 0
                            ? renderOption(dioceses)
                            :
                            <MenuItem value="">
                                <em>Vui Lòng Chọn Giáo Phận</em>
                            </MenuItem>
                        }
                    </TextField>
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
export default DeaneryAddDetail;