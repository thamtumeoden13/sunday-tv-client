import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom'

import { connect } from "react-redux";
import { setLoadingDetail } from "../../actions/pageInfos";

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../../component/AppBar'
import Drawer from '../../component/Drawer'
import Main from '../../component/Main'

import Dashboard from '../dashboard/Dashboard'

import Category from '../category/Category'
import CategoryAdd from '../category/CategoryAdd'
import CategoryEdit from '../category/CategoryEdit'

import Diocese from '../diocese/Diocese'
import DioceseAdd from '../diocese/DioceseAdd'
import DioceseEdit from '../diocese/DioceseEdit'

import Deanery from '../deanery/Deanery'
import DeaneryAdd from '../deanery/DeaneryAdd'
import DeaneryEdit from '../deanery/DeaneryEdit'

import Parish from '../parish/Parish'
import ParishAdd from '../parish/ParishAdd'
import ParishEdit from '../parish/ParishEdit'

import Poster from '../poster/Poster'
import NotFound from '../notfound/NotFound1'

import { AUTH_TOKEN } from '../../constant/config'
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import PrivateRoute from '../../route/privateRoute'
import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/core';
import LoadingOverlay from 'react-loading-overlay'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}))
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const mapStateToProps = state => {
    return {
        PageInfos: state.PageInfosModule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoadingDetail: isLoading => {
            dispatch(setLoadingDetail(isLoading));
        },
    };
};

const HomeScreen = (props) => {
    const classes = useStyles();
    const client = useApolloClient();

    const isLoggedIn = !!localStorage.getItem(AUTH_TOKEN)
    const [loading, setLoading] = useState(false)

    const [statusDrawer, setStatusDrawer] = useState(true)
    const handleDrawer = (value) => {
        setStatusDrawer(value)
    }

    const onSignOut = () => {
        localStorage.removeItem(AUTH_TOKEN);
        props.history.push(`/signin`)
        client.writeData({ data: { isLoggedIn: false } });
    }

    useEffect(() => {
        setLoading(props.PageInfos.loading)
    }, [props.PageInfos])

    return (
        <div className={classes.root}>
            <AppBar handleDrawer={handleDrawer} statusDrawer={statusDrawer} title={"Trang chủ"} onSignOut={onSignOut} />
            <Drawer handleDrawer={handleDrawer} statusDrawer={statusDrawer} />
            <Main>
                <LoadingOverlay
                    active={loading}
                    spinner={<PacmanLoader
                        css={override}
                        sizeUnit={"px"}
                        // size={150}
                        color={'#36D7B7'}
                        loading={loading}
                    />}
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: 'rgba(0,0,0,0.1)'
                        })
                    }}
                >
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/poster" component={Poster} isLoggedIn={isLoggedIn} />
                        <PrivateRoute exact path="/category" component={Category} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/category/add" component={CategoryAdd} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/category/edit/:id" component={CategoryEdit} isLoggedIn={isLoggedIn} />
                        <PrivateRoute exact path="/diocese" component={Diocese} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/diocese/add" component={DioceseAdd} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/diocese/edit/:id" component={DioceseEdit} isLoggedIn={isLoggedIn} />
                        <PrivateRoute exact path="/deanery" component={Deanery} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/deanery/add" component={DeaneryAdd} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/deanery/edit/:id" component={DeaneryEdit} isLoggedIn={isLoggedIn} />
                        <PrivateRoute exact path="/parish" component={Parish} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/parish/add" component={ParishAdd} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="/parish/edit/:id" component={ParishEdit} isLoggedIn={isLoggedIn} />
                        <PrivateRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} />
                    </Switch>
                </LoadingOverlay>
            </Main>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)