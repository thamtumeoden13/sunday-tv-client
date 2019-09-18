import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../../component/AppBar'
import Drawer from '../../component/Drawer'
import Main from '../../component/Main'

import Dashboard from '../dashboard/Dashboard'
import Catalog from '../catalog/Catalog'
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

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <AppBar handleDrawer={handleDrawer} statusDrawer={statusDrawer} title={"Trang chủ"} />
                <Drawer handleDrawer={handleDrawer} statusDrawer={statusDrawer} />
                <Main>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/catalog" component={Catalog} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Main>
            </div>
        </BrowserRouter>
    )
}
export default HomeScreen