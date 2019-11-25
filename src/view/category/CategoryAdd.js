import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import CategoryDetail from '../../component/category/add/Detail'
import CategoryContent from '../../component/category/add/Content'
import CategoryAddImages from '../../component/category/add/AddImages'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import { CATEGORY as CategoryPath } from '../../constant/BreadcrumbsConfig'
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
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
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
    const [activeStep, setActiveStep] = React.useState(0);
    const [dataSource, setDataSource] = React.useState({
        categoryDetail: {},
        categoryContent: { textEditor: "<p>All the parameters of the <code>search</code> method are optional. Including no parameters in the method call will return the 50 most recently created resources in descending order of creation time.My initial content.</p>" },
        categoryAddImages: {},
    });

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <CategoryDetail name="categoryDetail" dataSource={dataSource["categoryDetail"]} onChange={onChangeDataSource} />;
            case 1:
                return <CategoryContent name="categoryContent" dataSource={dataSource["categoryContent"]} onChange={onChangeDataSource} />;
            case 2:
                return <CategoryAddImages name="categoryAddImages" dataSource={dataSource["categoryAddImages"]} onChange={onChangeDataSource} />;
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

    const onChangeDataSource = (name, result, isReloadDeanery, isReloadParish) => {
        setDataSource({ ...dataSource, [name]: result })
        if (isReloadDeanery) {
            // getDeaneries({
            //     variables: {
            //         dioceseId: value.dioceseId
            //     }
            // })
        }
        if (isReloadParish) {
            // getDeaneries({
            //     variables: {
            //         dioceseId: value.dioceseId
            //     }
            // })
        }
    }

    useEffect(() => {
        props.setPagePath(CategoryPath.add)
    }, [])

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
                                    onClick={handleNext}
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