/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Detail from '../../component/deanery'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

// import { DEANERY as DeaneryPath } from '../../constant/breadcrumbsConfig'
import { DIOCESES, DEANERY_BY_ID, UPDATE_DEANERY_BY_ID } from '../../gql/deaneryGraphql'

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

export const DEANERY = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Giáo Hạt", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese", title: "Giáo Hạt", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese", title: "Giáo Hạt", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}

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
        props.setPagePath(DEANERY.edit)
        getDeaneryById()
        getDioceses()
    }, [])

    useEffect(() => {
        const loading = loadingQuery || loadingDioceses || loadingMutation
        props.setLoadingDetail(loading)
    }, [loadingQuery, loadingDioceses, loadingMutation])

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