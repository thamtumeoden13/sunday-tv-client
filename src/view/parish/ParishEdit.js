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
import { DIOCESES_CACHE, UPDATE_PARISH_BY_ID, DEANERIES_BY_DIOCESE, PARISH_BY_ID } from '../../gql/parishGraphql'
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

const ParishEdit = (props) => {
    const classes = useStyles();
    const parishId = props.match.params.id
    const [parish, setParish] = useState({
        id: '',
        name: '',
        shortName: '',
        dioceseId: '',
        deaneryId: '',
        published: false
    })
    const [dioceses, setDioceses] = useState([])
    const [deaneries, setDeaneries] = useState([])

    const [getParishById, { loading: loadingParishById, data: dataParishById, error, refetch }] = useLazyQuery(PARISH_BY_ID, {
        variables: {
            id: parishId
        }
    });

    const [getDioceses, { loading: loadingQueryDioceses, data: dataDioceses, error: errorQueryioceses }] = useLazyQuery(DIOCESES_CACHE);
    const [getDeaneries, { loading: loadingQueryDeaneries, data: dataDeaneries, error: errorQueryDeaneries }] = useLazyQuery(DEANERIES_BY_DIOCESE);
    const [updateParish, { loading: loadingMutation, error: errorMutationParish }] = useMutation(UPDATE_PARISH_BY_ID,
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
        updateParish({
            variables: {
                id: parish.id,
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
        getParishById()
        getDioceses()
    }, [])

    useEffect(() => {
        const loading = loadingQueryDioceses || loadingQueryDeaneries || loadingParishById || loadingMutation
        props.setLoadingDetail(loading)
    }, [loadingQueryDioceses, loadingQueryDeaneries, loadingParishById, loadingMutation])

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
        if (dataParishById && dataParishById.parish) {
            let temp = dataParishById.parish
            temp.dioceseId = dataParishById.parish.diocese.id ? dataParishById.parish.diocese.id : ''
            temp.deaneryId = dataParishById.parish.deanery.id ? dataParishById.parish.deanery.id : ''
            setParish(temp)
            getDeaneries({
                variables: {
                    dioceseId: temp.dioceseId
                }
            })
        }
    }, [dataParishById])

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
                                parish={parish}
                                deaneries={deaneries}
                                dioceses={dioceses}
                                onChange={onChangeText}
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
export default connect(mapStateToProps, mapDispatchToProps)(ParishEdit);