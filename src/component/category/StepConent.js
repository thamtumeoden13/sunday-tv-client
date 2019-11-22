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
const StepContent = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(props.activeStep);

    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return <CategoryDetail dataSource={{}} />;
            case 1:
                return <CategoryContent dataSource={{}} />;
            case 2:
                return <CategoryAddImages dataSource={{}} />;
            default:
                throw new Error('Unknown step');
        }
    }

    useEffect(() => {
        setActiveStep(props.activeStep)
    }, [props.activeStep])

    return (
        <Fragment>
            {getStepContent()}
        </Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(StepContent);