/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/deanery'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import { DEANERY as DeaneryPath } from '../../constant/breadcrumbsConfig'
import { DIOCESES, CREATE_DEANERY } from '../../gql/deaneryGraphql'

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

const DeaneryAdd = (props) => {
    const classes = useStyles();
    const [deanery, setDeanery] = useState({
        name: '',
        shortName: '',
        dioceseId: '',
        published: false
    })
    const [dioceses, setDioceses] = useState([])

    const [getDioceses, { loading: loadingQuery, data, error: errorQuery }] = useLazyQuery(DIOCESES);
    const [createDeanery, { loading: loadingMutation, error }] = useMutation(CREATE_DEANERY,
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
        createDeanery({
            variables: {
                input: {
                    name: deanery.name,
                    shortName: deanery.shortName,
                    published: deanery.published,
                    dioceseId: deanery.dioceseId
                }
            }
        })
    };

    useEffect(() => {
        props.setPagePath(DeaneryPath.add)
        getDioceses()
    }, [])

    useEffect(() => {
        if (data && data.dioceses) {
            setDioceses(data.dioceses)
        }
    }, [data])

    useEffect(() => {
        const loading = loadingQuery || loadingMutation
        props.setLoadingDetail(loading)
    }, [loadingQuery, loadingMutation])

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            TẠO MỚI GIÁO HẠT
                        </Typography>
                        <React.Fragment>
                            <Detail
                                onChange={onChangeText}
                                dioceses={dioceses}
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
export default connect(mapStateToProps, mapDispatchToProps)(DeaneryAdd);