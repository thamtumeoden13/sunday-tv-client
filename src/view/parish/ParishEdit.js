import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/parish'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import { PARISH as ParishPath } from '../../constant/breadcrumbsConfig'
import { DIOCESES_CACHE, UPDATE_PARISH_BY_ID, DEANERIES_BY_DIOCESE, PARISH_BY_ID } from '../../gql/parishGraphql'

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
        props.setPagePath(ParishPath.add)
        getParishById()
        getDioceses()
    }, [])

    useEffect(() => {
        props.setLoadingDetail(loadingQueryDioceses)
    }, [loadingQueryDioceses])

    useEffect(() => {
        props.setLoadingDetail(loadingQueryDeaneries)
    }, [loadingQueryDeaneries])

    useEffect(() => {
        props.setLoadingDetail(loadingParishById)
    }, [loadingParishById])

    useEffect(() => {
        props.setLoadingDetail(loadingMutation)
    }, [loadingMutation])

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