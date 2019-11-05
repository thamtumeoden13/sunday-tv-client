import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom'
import { createBrowserHistory } from "history";

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

import Poster from '../poster/Poster'
import NotFound from '../notfound/NotFound1'

import { AUTH_TOKEN } from '../../constant/config'
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import PrivateRoute from '../../route/privateRoute'

const history = createBrowserHistory()
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}))
const HomeScreen = (props) => {
    const classes = useStyles();
    const client = useApolloClient();

    const isLoggedIn = !!localStorage.getItem(AUTH_TOKEN)
    console.log("isLoggedIn", isLoggedIn)

    const [statusDrawer, setStatusDrawer] = useState(true)
    const handleDrawer = (value) => {
        setStatusDrawer(value)
    }

    const onSignOut = () => {
        localStorage.removeItem(AUTH_TOKEN);
        props.history.push(`/signin`)
        client.writeData({ data: { isLoggedIn: false } });
    }

    return (
        <div className={classes.root}>
            <AppBar handleDrawer={handleDrawer} statusDrawer={statusDrawer} title={"Trang chủ"} onSignOut={onSignOut} />
            <Drawer handleDrawer={handleDrawer} statusDrawer={statusDrawer} />
            <Main>
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
                    <PrivateRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} />
                </Switch>
            </Main>
        </div>
    )
}
export default HomeScreen