import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/deanery/add/Detail'

import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CREATEDEANERY = gql`
   mutation createDeanery($name: String!,$shortName: String!, $dioceseId: ID!) {
    createDeanery(name: $name, shortName: $shortName, dioceseId: $dioceseId) {
        id
        name
        shortName
    }
  }
`;

const DIOCESES = gql`
   query dioceses{
        dioceses{
            id
            name
            shortName
        }
    }
`;

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

const DeaneryAdd = (props) => {
    const classes = useStyles();
    const [deanery, setDeanery] = useState({
        name: '',
        shortName: '',
        dioceseId: ''
    })
    const [dioceses, setDioceses] = useState([])

    const [getDioceses, { loadingDioceses, data, errorDioceses }] = useLazyQuery(DIOCESES);
    const [createDeanery, { loading, error }] = useMutation(CREATEDEANERY,
        {
            onCompleted(...params) {
                if (params) {
                    // < Redirect to = '/' />
                    props.history.goBack();
                    //console.log({ params })
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
        createDeanery({ variables: { name: deanery.name, shortName: deanery.shortName, dioceseId: deanery.dioceseId } })
    };

    useEffect(() => {
        getDioceses()
    }, [])

    useEffect(() => {
        if (data && data.dioceses) {
            setDioceses(data.dioceses)
        }
    }, [data])

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
                                // data={diocese}
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
export default withRouter(DeaneryAdd);