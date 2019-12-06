/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/parish'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

// import { PARISH as ParishPath } from '../../constant/breadcrumbsConfig'
import { DIOCESES_CACHE, CREATE_PARISH, DEANERIES_BY_DIOCESE } from '../../gql/parishGraphql'
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const mapStateToProps = state => {
    return {
        PageInfos: state.PageInfosModule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setPagePath: pagePath => {
            dispatch(setPagePath(pagePath));
        },
        setLoadingDetail: isLoading => {
            dispatch(setLoadingDetail(isLoading));
        },
    };
};

export const PARISH = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Giáo Xứ", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/parish", title: "Giáo Xứ", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/parish", title: "Giáo Xứ", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}

const ParishAdd = (props) => {
    const classes = useStyles();
    const [parish, setParish] = useState({
        name: '',
        shortName: '',
        dioceseId: '',
        deaneryId: '',
        published: false
    })
    const [dioceses, setDioceses] = useState([])
    const [deaneries, setDeaneries] = useState([])

    const [getDioceses, { loading: loadingQueryDioceses, data: dataDioceses, error: errorQueryioceses }] = useLazyQuery(DIOCESES_CACHE);
    const [getDeaneries, { loading: loadingQueryDeaneries, data: dataDeaneries, error: errorQueryDeaneries }] = useLazyQuery(DEANERIES_BY_DIOCESE);
    const [createParish, { loading: loadingMutation, error }] = useMutation(CREATE_PARISH,
        {
            onCompleted(...params) {
                if (params) {
                    props.history.goBack();
                }
            },
            onError(error) {
                alert(error)
            }
        }
    );

    const onChangeText = (value, isReloadDeanery) => {
        setParish(value);
        if (isReloadDeanery) {
            getDeaneries({
                variables: {
                    dioceseId: value.dioceseId
                }
            })
        }
    }

    const handleSubmit = () => {
        createParish({
            variables: {
                input: {
                    name: parish.name,
                    shortName: parish.shortName,
                    published: parish.published,
                    dioceseId: parish.dioceseId,
                    deaneryId: parish.deaneryId
                }
            }
        })
    };

    useEffect(() => {
        props.setPagePath(PARISH.add)
        getDioceses()
    }, [])

    useEffect(() => {
        if (dataDioceses && dataDioceses.dioceses) {
            setDioceses(dataDioceses.dioceses)
        }
    }, [dataDioceses])

    useEffect(() => {
        if (dataDeaneries && dataDeaneries.deaneriesByDiocese) {
            setDeaneries(dataDeaneries.deaneriesByDiocese.deaneries)
        }
    }, [dataDeaneries])

    useEffect(() => {
        const loading = loadingQueryDioceses || loadingQueryDeaneries || loadingMutation
        props.setLoadingDetail(loading)
    }, [loadingQueryDioceses, loadingQueryDeaneries, loadingMutation])

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            TẠO MỚI GIÁO XỨ
                        </Typography>
                        <React.Fragment>
                            <Detail
                                onChange={onChangeText}
                                dioceses={dioceses}
                                deaneries={deaneries}
                            />
                            <div className={classes.buttons}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    className={classes.button}
                                >
                                    CẬP NHẬT
                                </Button>
                            </div>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ParishAdd);