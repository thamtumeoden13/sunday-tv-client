import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/deanery/edit/Detail'

import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

const DEANERYBYID = gql`
   query deanery($id: ID!){
        deanery(id: $id){
            id
            name
            shortName
        }
    }
`;
const UPDATEDEANERYBYID = gql`
   mutation updateDeanery($id: ID! $name: String!,$shortName: String!) {
    updateDeanery(id: $id, name: $name, shortName: $shortName) {
        id
        name
        shortName
    }
  }
`;

const DeaneryEdit = (props) => {
    const classes = useStyles();
    const deaneryId = props.match.params.id
    const [deanery, setDeanery] = useState({
        id: '',
        nName: '',
        shortName: ''
    })

    const [getDeaneryById, { loading, data, error, refetch }] = useLazyQuery(DEANERYBYID, {
        variables: {
            id: deaneryId
        }
    });

    const [updateDeanery, { loadingEdit, errorEdit }] = useMutation(UPDATEDEANERYBYID,
        {
            onCompleted(...params) {
                if (params) {
                    // < Redirect to = '/' />
                    props.history.goBack();
                    console.log({ params })
                }
            },
            onError(error) {
                console.log('onError', error)
                alert(error)
            }
        }
    );

    useEffect(() => {
        getDeaneryById()
    }, [])

    useEffect(() => {
        if (data && data.deanery) {
            setDeanery(data.deanery)
        }
    }, [data])

    const onChangeText = (name, value) => {
        setDeanery({ ...deanery, [name]: value });
    }

    const handleSubmit = () => {
        updateDeanery({ variables: { id: deanery.id, name: deanery.name, shortName: deanery.shortName } })
    };

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
                                data={deanery}
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
export default withRouter(DeaneryEdit);