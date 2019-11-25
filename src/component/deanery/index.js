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

const DeaneryCom = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        id: '',
        name: '',
        shortName: '',
        dioceseId: '',
        published: false
    });

    const [dioceses, setDioceses] = useState([]);

    const handleChange = (event) => {
        const valueObject = { ...state, [event.target.name]: event.target.value }
        setState(valueObject);
        if (props.onChange) {
            props.onChange(valueObject)
        }
    };
    const handleChangeCheckbox = (event) => {
        const valueObject = { ...state, [event.target.name]: !state[event.target.name] }
        setState(valueObject);
        if (props.onChange) {
            props.onChange(valueObject)
        }
    };

    const renderOption = (listOption) => {
        return (
            listOption.map((e, i) => {
                return <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
            })
        )
    }

    useEffect(() => {
        if (props.deanery) {
            setState({
                id: props.deanery.id ? props.deanery.id : '',
                name: props.deanery.name ? props.deanery.name : '',
                shortName: props.deanery.shortName ? props.deanery.shortName : '',
                dioceseId: props.deanery.dioceseId ? props.deanery.dioceseId : '',
                published: props.deanery.published ? props.deanery.published : false,
            });
        }
    }, [props.deanery])

    useEffect(() => {
        setDioceses(props.dioceses ? props.dioceses : [])
    }, [props.dioceses])


    return (
        <div className={classes.paper}>
            <CssBaseline />
            <Grid container component="main" spacing={2} className={classes.root} >
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="id"
                        id="id"
                        label="Mã Giáo Hạt(Tự động)"
                        disabled
                        value={state.id}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        id="name"
                        label="Tên Giáo Hạt"
                        name="name"
                        autoFocus
                        value={state.name}
                        onChange={(event) => handleChange(event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="shortName"
                        label="Tên rút gọn"
                        name="shortName"
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
                        id="dioceseId"
                        select
                        label="Giáo phận"
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
                                value={state.published} checked={state.published}
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
export default DeaneryCom;