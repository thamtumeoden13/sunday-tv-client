import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
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

const CategoryAddContent = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        id: '',
        name: '',
        title: '',
        dioceseId: '',
        deaneryId: '',
        parishId: '',
        published: false
    });

    const [dioceses, setDioceses] = useState([]);
    const [deaneries, setDeaneries] = useState([]);
    const [parishes, setParishes] = useState([]);

    const handleChange = (event) => {
        let valueObject = { ...state, [event.target.name]: event.target.value }
        let isReloadDeanery = false
        let isReloadParish = false
        if (event.target.name === 'dioceseId') {
            isReloadDeanery = true
            valueObject = { ...state, [event.target.name]: event.target.value, deaneryId: '', parishId: '' }
        } else if (event.target.name === 'deaneryId') {
            isReloadParish = true
            valueObject = { ...state, [event.target.name]: event.target.value, parishId: '' }
        }
        setState(valueObject);
        if (props.onChange) {
            props.onChange(props.name, valueObject, isReloadDeanery, isReloadParish)
        }
    }

    const handleChangeCheckbox = (event) => {
        let valueObject = { ...state, [event.target.name]: !state[event.target.name] }
        setState(valueObject);
        if (props.onChange) {
            props.onChange(props.name, valueObject)
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
        if (props.dataSource) {
            setState({
                id: props.dataSource.id ? props.dataSource.id : '',
                name: props.dataSource.name ? props.dataSource.name : '',
                title: props.dataSource.title ? props.dataSource.title : '',
                dioceseId: props.dataSource.dioceseId ? props.dataSource.dioceseId : '',
                deaneryId: props.dataSource.deaneryId ? props.dataSource.deaneryId : '',
                parishId: props.dataSource.parishId ? props.dataSource.parishId : '',
                published: props.dataSource.published ? props.dataSource.published : false,
            });
        }
    }, [props.dataSource])

    useEffect(() => {
        setDioceses(props.dioceses ? props.dioceses : [])
    }, [props.dioceses])

    useEffect(() => {
        setDeaneries(props.deaneries ? props.deaneries : [])
    }, [props.deaneries])

    useEffect(() => {
        setParishes(props.parishes ? props.parishes : [])
    }, [props.parishes])

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
                        label="Mã Danh Mục(Tự động)"
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
                        label="Tên Danh Mục"
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
                        id="title"
                        label="Tiêu Đề Danh Mục"
                        name="title"
                        value={state.title}
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
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="parishId"
                        id="parishId"
                        select
                        label="Giáo Xứ"
                        value={state.parishId}
                        onChange={(event) => handleChange(event)}
                    >
                        {parishes && parishes.length > 0
                            ? renderOption(parishes)
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
export default CategoryAddContent;