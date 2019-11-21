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

const listOptionDiocese = [
    {
        value: "1",
        label: "Giáo Phận Sài Gòn"
    },
    {
        value: "2",
        label: "Giáo Phận Vinh"
    },
    {
        value: "3",
        label: "Giáo Phận Hà Nội"
    }
]


const listOptionDeanery = [
    {
        dioceseId: "1",
        value: "1",
        label: "Giáo Hạt Gia Định"
    },
    {
        dioceseId: "2",
        value: "1",
        label: "Giáo Hạt chính tòa Xã Đoài"
    },
    {
        dioceseId: "2",
        value: "2",
        label: "Giáo Hạt Thuận Nghĩa"
    },
    {
        dioceseId: "3",
        value: "1",
        label: "Giáo Hạt Chính Tòa"
    },
    {
        dioceseId: "3",
        value: "2",
        label: "Giáo Hạt Phủ Lý"
    },
    {
        dioceseId: "3",
        value: "3",
        label: "Giáo Hạt Nam Định"
    }
]


const listOptionParish = [
    {
        dioceseId: "1",
        deaneryId: "1",
        value: "1",
        label: "Giáo Xứ Đức Mẹ Vô Nhiễm"
    },
    {
        dioceseId: "2",
        deaneryId: "1",
        value: "1",
        label: "Giáo Hạt Xã Đoài"
    },
    {
        dioceseId: "3",
        deaneryId: "2",
        value: "1",
        label: "Giáo xứ An Tập"
    },
]

const CategoryAddContent = (props) => {
    const classes = useStyles();
    const [publish, setPublished] = useState(!props.publish ? false : props.publish);
    const [state, setState] = React.useState({
        diocese: '',
        deanery: '',
        parish: ''
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: Number(event.target.value) });
    };

    const onChangePublished = () => {
        setPublished(!publish)
    }

    const renderOption = (listOption) => {
        return (
            listOption.map((e, i) => {
                return <MenuItem value={e.value} key={i}>{e.label}</MenuItem>
            })
        )
    }

    useEffect(() => {
        setPublished(!props.publish ? false : props.publish)
    }, [props.publish])

    return (
        <div className={classes.paper}>
            <CssBaseline />
            <Grid container component="main" spacing={2} className={classes.root} >
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="categoryId"
                        variant="outlined"
                        required
                        fullWidth
                        id="categoryId"
                        label="Mã danh mục"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="categoryName"
                        label="Tên danh mục"
                        name="categoryName"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="categoryTitle"
                        label="Tiêu đề danh mục"
                        name="categoryTitle"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="diocese"
                        label="Giáo Phận"
                        select={true}
                        value={state.diocese}
                        onChange={(event) => handleChange(event)}
                    >
                        {renderOption && renderOption.length > 0
                            ? renderOption(listOptionDiocese)
                            :
                            <MenuItem value="">
                                <em>Vui Lòng Chọn Giáo Phận</em>
                            </MenuItem>
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="deanery"
                        label="Giáo Hạt"
                        select={true}
                        value={state.deanery}
                        onChange={(event) => handleChange(event)}
                    >
                        {renderOption && renderOption.length > 0
                            ? renderOption(listOptionDeanery)
                            :
                            <MenuItem value="">
                                <em>Vui Lòng Chọn Giáo Hạt</em>
                            </MenuItem>
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="parish"
                        label="Giáo Xứ"
                        select={true}
                        value={state.parish}
                        onChange={(event) => handleChange(event)}
                    >
                        {renderOption && renderOption.length > 0
                            ? renderOption(listOptionParish)
                            :
                            <MenuItem value="">
                                <em>Vui Lòng Chọn Giáo Xứ</em>
                            </MenuItem>
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value={publish} checked={publish} color="primary" name="published" id="published" onChange={() => onChangePublished()} />}
                        label="Công khai"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default CategoryAddContent;