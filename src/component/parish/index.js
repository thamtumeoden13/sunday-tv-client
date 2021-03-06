import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    },
    root: {
        width: '50%'
    },
}));

const ParishCom = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        id: '',
        name: '',
        shortName: '',
        dioceseId: '',
        deaneryId: '',
        published: false
    });

    const [dioceses, setDioceses] = useState([]);
    const [deaneries, setDeaneries] = useState([]);

    const handleChange = (event) => {
        let valueObject = { ...state, [event.target.name]: event.target.value }
        let isReloadDeanery = false
        if (event.target.name === 'dioceseId') {
            isReloadDeanery = true
            valueObject = { ...state, [event.target.name]: event.target.value, deaneryId: '' }
        }
        setState(valueObject);
        if (props.onChange) {
            props.onChange(valueObject, isReloadDeanery)
        }
    }

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
        if (props.parish) {
            setState({
                id: props.parish.id ? props.parish.id : '',
                name: props.parish.name ? props.parish.name : '',
                shortName: props.parish.shortName ? props.parish.shortName : '',
                dioceseId: props.parish.dioceseId ? props.parish.dioceseId : '',
                deaneryId: props.parish.deaneryId ? props.parish.deaneryId : '',
                published: props.parish.published ? props.parish.published : false,
            });
        }
    }, [props.parish])

    useEffect(() => {
        setDioceses(props.dioceses ? props.dioceses : [])
    }, [props.dioceses])

    useEffect(() => {
        setDeaneries(props.deaneries ? props.deaneries : [])
    }, [props.deaneries])

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
                        label="Mã Giáo Xứ(Tự động)"
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
                        label="Tên Giáo Xứ"
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
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="deaneryId"
                        id="deaneryId"
                        select
                        label="Giáo Hạt"
                        value={state.deaneryId}
                        onChange={(event) => handleChange(event)}
                    >
                        {deaneries && deaneries.length > 0
                            ? renderOption(deaneries)
                            :
                            <MenuItem value="">
                                <em>Vui Lòng Chọn Giáo Hạt</em>
                            </MenuItem>
                        }
                    </TextField>
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
export default ParishCom;