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

import Poster from '../poster/Poster'
import NotFound from '../notfound/NotFound1'

const history = createBrowserHistory()
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}))
const HomeScreen = (props) => {
    const classes = useStyles();
    const [statusDrawer, setStatusDrawer] = useState(true)
    const handleDrawer = (value) => {
        setStatusDrawer(value)
    }
    console.log({ props, history })
    return (
        <div className={classes.root}>
            <AppBar handleDrawer={handleDrawer} statusDrawer={statusDrawer} title={"Trang chủ"} />
            <Drawer handleDrawer={handleDrawer} statusDrawer={statusDrawer} />
            <Main>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/poster" component={Poster} />
                    <Route exact path="/category" component={Category} />
                    <Route path="/category/add" component={CategoryAdd} />
                    <Route path="/category/edit/:id" component={CategoryEdit} />
                    <Route exact path="/diocese" component={Diocese} />
                    <Route path="/diocese/add" component={DioceseAdd} />
                    <Route path="/diocese/edit/:id" component={DioceseEdit} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Main>
        </div>
    )
}
export default HomeScreen