import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/deanery'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import { DEANERY as DeaneryPath } from '../../constant/BreadcrumbsConfig'
import { DIOCESES, DEANERY_BY_ID, UPDATE_DEANERY_BY_ID } from '../../gql/graphqlTag'

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

const DeaneryEdit = (props) => {
    const classes = useStyles();
    const deaneryId = props.match.params.id
    const [deanery, setDeanery] = useState({
        id: '',
        name: '',
        shortName: '',
        dioceseId: '',
        published: false
    })
    const [dioceses, setDioceses] = useState([])

    const [getDeaneryById, { loading: loadingQuery, data: dataDeanery, error, refetch }] = useLazyQuery(DEANERY_BY_ID, {
        variables: {
            id: deaneryId
        }
    });

    const [getDioceses, { loading: loadingDioceses, data: dataDioceses, error: errorDioceses }] = useLazyQuery(DIOCESES);
    const [updateDeanery, { loading: loadingMutation, error: errorMutation }] = useMutation(UPDATE_DEANERY_BY_ID,
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

    const onChangeText = (value) => {
        setDeanery(value);
    }

    const handleSubmit = () => {
        updateDeanery({
            variables: {
                id: deanery.id,
                name: deanery.name,
                shortName: deanery.shortName,
                published: deanery.published,
                dioceseId: deanery.dioceseId
            }
        })
    };

    useEffect(() => {
        props.setPagePath(DeaneryPath.edit)
        getDeaneryById()
        getDioceses()
    }, [])

    useEffect(() => {
        props.setLoadingDetail(loadingQuery)
    }, [loadingQuery,])

    useEffect(() => {
        props.setLoadingDetail(loadingDioceses)
    }, [loadingDioceses,])

    useEffect(() => {
        props.setLoadingDetail(loadingMutation)
    }, [loadingMutation])

    useEffect(() => {
        if (dataDeanery && dataDeanery.deanery) {
            let temp = dataDeanery.deanery
            temp.dioceseId = dataDeanery.deanery.diocese.id ? dataDeanery.deanery.diocese.id : ''
            setDeanery(temp)
        }
    }, [dataDeanery])

    useEffect(() => {
        if (dataDioceses && dataDioceses.dioceses) {
            setDioceses(dataDioceses.dioceses)
        }
    }, [dataDioceses])

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            CHỈNH SỬA GIÁO HẠT
                        </Typography>
                        <React.Fragment>
                            <Detail
                                deanery={deanery}
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
export default connect(mapStateToProps, mapDispatchToProps)(DeaneryEdit);