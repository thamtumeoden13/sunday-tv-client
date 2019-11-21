import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/deanery/add/Detail'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import { DEANERY as DeaneryPath } from '../../constant/BreadcrumbsConfig'
import { DIOCESES, CREATE_DEANERY } from '../../gql/graphqlTag'

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
                console.log('onError', error)
                alert(error)
            }
        }
    );

    const onChangeText = (name, value) => {
        setDeanery({ ...deanery, [name]: value });
    }

    const handleSubmit = () => {
        createDeanery({
            variables: {
                name: deanery.name,
                shortName: deanery.shortName,
                published: deanery.published,
                dioceseId: deanery.dioceseId
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
        props.setLoadingDetail(loadingQuery)
    }, [loadingQuery])

    useEffect(() => {
        props.setLoadingDetail(loadingMutation)
    }, [loadingMutation])

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