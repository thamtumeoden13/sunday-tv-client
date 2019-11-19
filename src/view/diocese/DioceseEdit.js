import React, { Fragment, useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import Detail from '../../component/diocese/edit/Detail'
import { DIOCESE as DiocesePath } from '../../constant/BreadcrumbsConfig'
import { DIOCESE_BY_ID, UPDATE_DIOCESE_BY_ID } from '../../gql/graphqlTag'

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

const DioceseEdit = (props) => {
    const classes = useStyles();
    const dioceseId = props.match.params.id
    const [diocese, setDiocese] = useState({
        id: '',
        name: '',
        shortName: '',
        published: false
    })

    const [getDioceseById, { loading: loadingQuery, data: dataQuery, error: errorQuery, refetch }] = useLazyQuery(DIOCESE_BY_ID, {
        variables: {
            id: dioceseId
        }
    });

    const [updateDiocese, { loading: loadingMutation, error: errorEdit }] = useMutation(UPDATE_DIOCESE_BY_ID,
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

    useEffect(() => {
        props.setPagePath(DiocesePath.edit)
        getDioceseById()
    }, [])

    useEffect(() => {
        if (dataQuery && dataQuery.diocese) {
            setDiocese(dataQuery.diocese)
        }
    }, [dataQuery])

    useEffect(() => {
        props.setLoadingDetail(loadingQuery)
    }, [loadingQuery])

    useEffect(() => {
        props.setLoadingDetail(loadingMutation)
    }, [loadingMutation])

    const onChangeText = (name, value) => {
        setDiocese({ ...diocese, [name]: value });
    }

    const handleSubmit = () => {
        updateDiocese({
            variables: {
                id: diocese.id,
                name: diocese.name,
                shortName: diocese.shortName,
                published: diocese.published,
            }
        })
    };

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            CHỈNH SỬA GIÁO PHẬN
                        </Typography>
                        <React.Fragment>
                            <Detail
                                data={diocese}
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
export default connect(mapStateToProps, mapDispatchToProps)(DioceseEdit);