import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../../component/AppBar'
import Drawer from '../../component/Drawer'
import Main from '../../component/Main'

import Dashboard from '../dashboard/Dashboard'

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
        <div className={classes.root}>
            <AppBar handleDrawer={handleDrawer} statusDrawer={statusDrawer} title={"Trang chủ"} />
            <Drawer handleDrawer={handleDrawer} statusDrawer={statusDrawer} />
            <Main>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                </Switch>
            </Main>
        </div>
    )
}
export default HomeScreen