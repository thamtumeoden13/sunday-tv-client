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
import { DIOCESES_CACHE, DEANERIES_BY_DIOCESE, PARISHES_BY_DEANERY, UPDATE_CATEGORY_BY_ID, CATEGORY_BY_ID } from '../../gql/categoryGraphql'
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

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

const CATEGORY = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Danh Mục", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/category", title: "Danh Mục", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/category", title: "Danh Mục", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}
const CategoryEdit = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const categoryId = props.match.params.id
    const [result, setResult] = useState({
        categoryDetail: {
            id: '',
            name: '',
            title: '',
            published: '',
            dioceseId: '',
            deaneryId: '',
            parishId: ''
        },
        categoryContent: { textEditor: "<p>All the parameters of the <code>search</code> method are optional. Including no parameters in the method call will return the 50 most recently created resources in descending order of creation time.My initial content.</p>" },
        categoryAddImages: [],
    })

    const [dioceses, setDioceses] = useState([])
    const [deaneries, setDeaneries] = useState([])
    const [parishes, setParishes] = useState([])

    const [getCategoryById, { loading: loadingCategoryById, data: dataCategoryById, error, refetch }] = useLazyQuery(CATEGORY_BY_ID, {
        variables: {
            id: categoryId
        }
    });
    const [getDioceses, { loading: loadingQueryDioceses, data: dataDioceses, error: errorQueryioceses }] = useLazyQuery(DIOCESES_CACHE);
    const [getDeaneries, { loading: loadingQueryDeaneries, data: dataDeaneries, error: errorQueryDeaneries }] = useLazyQuery(DEANERIES_BY_DIOCESE);
    const [getParishes, { loading: loadingQueryParishes, data: dataParishes, error: errorQueryParishes }] = useLazyQuery(PARISHES_BY_DEANERY);
    const [updateCategory, { loading: loadingMutation, error: errorMutation }] = useMutation(UPDATE_CATEGORY_BY_ID,
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
        updateCategory({
            variables: {
                id: result.categoryDetail.id,
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
        props.setPagePath(CATEGORY.edit)
        getCategoryById()
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

    useEffect(() => {
        if (dataCategoryById && dataCategoryById.category) {
            const textEditor = dataCategoryById.category.content
            let categoryDetail = dataCategoryById.category
            categoryDetail.dioceseId = dataCategoryById.category.diocese.id ? dataCategoryById.category.diocese.id : ''
            categoryDetail.deaneryId = dataCategoryById.category.deanery.id ? dataCategoryById.category.deanery.id : ''
            categoryDetail.parishId = dataCategoryById.category.parish.id ? dataCategoryById.category.parish.id : ''
            const images = dataCategoryById.category.posters.map((e, i) => { return { secure_url: e.secure_url, public_id: e.public_id } })
            setResult({
                categoryDetail: categoryDetail,
                categoryContent: { textEditor: textEditor },
                categoryAddImages: images,
            })
            getDeaneries({
                variables: {
                    dioceseId: categoryDetail.dioceseId
                }
            })
            getParishes({
                variables: {
                    deaneryId: categoryDetail.deaneryId
                }
            })
        }
    }, [dataCategoryById])

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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);