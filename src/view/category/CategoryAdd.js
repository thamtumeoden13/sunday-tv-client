/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import CategoryDetail from '../../component/category/Detail'
import CategoryContent from '../../component/category/Content'
import CategoryAddImages from '../../component/category/AddImages'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

// import { CATEGORY as CategoryPath } from '../../constant/breadcrumbsConfig'
import { DIOCESES_CACHE, DEANERIES_BY_DIOCESE, PARISHES_BY_DEANERY, CREATE_CATEGORY } from '../../gql/categoryGraphql'

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

const steps = ['Detail', 'TextEditor', 'Add Image'];

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
const CategoryAdd = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [result, setResult] = useState({
        categoryDetail: {
            name: '',
            title: '',
            published: '',
            dioceseId: '',
            deaneryId: '',
            parishId: ''
        },
        categoryContent: { textEditor: '' },
        categoryAddImages: [],
    })

    const [dioceses, setDioceses] = useState([])
    const [deaneries, setDeaneries] = useState([])
    const [parishes, setParishes] = useState([])

    const [getDioceses, { loading: loadingQueryDioceses, data: dataDioceses, error: errorQueryioceses }] = useLazyQuery(DIOCESES_CACHE);
    const [getDeaneries, { loading: loadingQueryDeaneries, data: dataDeaneries, error: errorQueryDeaneries }] = useLazyQuery(DEANERIES_BY_DIOCESE);
    const [getParishes, { loading: loadingQueryParishes, data: dataParishes, error: errorQueryParishes }] = useLazyQuery(PARISHES_BY_DEANERY);
    const [createCategory, { loading: loadingMutation, error }] = useMutation(CREATE_CATEGORY,
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
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <CategoryDetail name="categoryDetail" dataSource={result["categoryDetail"]} onChange={onChangeDataSource} dioceses={dioceses} deaneries={deaneries} parishes={parishes} />;
            case 1:
                return <CategoryContent name="categoryContent" dataSource={result["categoryContent"]} onChange={onChangeDataSource} />;
            case 2:
                return <CategoryAddImages name="categoryAddImages" dataSource={result["categoryAddImages"]} onChange={onChangeDataSource} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    const handleSubmit = () => {
        createCategory({
            variables: {
                input: {
                    name: result.categoryDetail.name,
                    title: result.categoryDetail.title,
                    content: result.categoryContent.textEditor,
                    published: result.categoryDetail.published,
                    dioceseId: result.categoryDetail.dioceseId,
                    deaneryId: result.categoryDetail.deaneryId,
                    parishId: result.categoryDetail.parishId,
                    images: result.categoryAddImages,
                }
            }
        })
    }
    const onChangeDataSource = (name, value, isReloadDeanery, isReloadParish) => {
        setResult({ ...result, [name]: value })
        if (isReloadDeanery) {
            getDeaneries({
                variables: {
                    dioceseId: value.dioceseId
                }
            })
        }
        if (isReloadParish) {
            getParishes({
                variables: {
                    deaneryId: value.deaneryId
                }
            })
        }
    }

    useEffect(() => {
        // props.setPagePath(CategoryPath.add)
        getDioceses()
    }, [])

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
        if (dataParishes && dataParishes.parishesByDeanery) {
            setParishes(dataParishes.parishesByDeanery.parishes)
        }
    }, [dataParishes])

    useEffect(() => {
        const loading = loadingQueryDioceses || loadingQueryDeaneries || loadingQueryParishes || loadingMutation;
        props.setLoadingDetail(loading)
    }, [loadingQueryDioceses, loadingQueryDeaneries, loadingQueryParishes, loadingMutation])

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            DANH MỤC
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);