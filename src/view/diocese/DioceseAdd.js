import React, { Fragment, useState, useEffect } from 'react';

import { connect } from "react-redux";
import { setPagePath } from "../../actions/pageInfos";

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/diocese/add/Detail'
import { DIOCESE } from '../../constant/BreadcrumbsConfig'

import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CREATEDIOCESE = gql`
   mutation createDiocese($name: String!,$shortName: String!) {
    createDiocese(name: $name, shortName: $shortName) {
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
    };
};

const DioceseAdd = (props) => {
    const classes = useStyles();
    const [diocese, setDiocese] = useState({
        id: '',
        name: '',
        shortName: ''
    })

    const [createDiocese, { loading, error }] = useMutation(CREATEDIOCESE,
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
        setDiocese({ ...diocese, [name]: value });
    }

    const handleSubmit = () => {
        createDiocese({ variables: { name: diocese.name, shortName: diocese.shortName } })
    };

    useEffect(() => {
        props.setPagePath(DIOCESE.add)
    }, [])

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            TẠO MỚI GIÁO PHẬN
                        </Typography>
                        <React.Fragment>
                            <Detail
                                // data={diocese}
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
export default connect(mapStateToProps, mapDispatchToProps)(DioceseAdd);