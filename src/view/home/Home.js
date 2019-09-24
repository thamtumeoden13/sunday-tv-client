import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../../component/AppBar'
import Drawer from '../../component/Drawer'
import Main from '../../component/Main'

import Dashboard from '../dashboard/Dashboard'
import Category from '../category/Category'
import CategoryAdd from '../category/CategoryAdd'
import Poster from '../poster/Poster'
import NotFound from '../notfound/NotFound'

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
    console.log({ props })
    return (
        <BrowserRouter>
            <div className={classes.root}>
                <AppBar handleDrawer={handleDrawer} statusDrawer={statusDrawer} title={"Trang chủ"} />
                <Drawer handleDrawer={handleDrawer} statusDrawer={statusDrawer} />
                <Main>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/poster" component={Poster} />
                        <Route exact path="/category" component={Category} />
                        <Route path="/category/:id" component={CategoryAdd} />
                        {/* <Route path="*" component={NotFound} /> */}
                    </Switch>
                </Main>
            </div>
        </BrowserRouter>
    )
}
export default HomeScreen