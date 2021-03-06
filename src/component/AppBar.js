import React, { useEffect, useState, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SignOut from '@material-ui/icons/SettingsPower';
import HomeIcon from '@material-ui/icons/Home';

import { setPagePath } from "../actions/pageInfos";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#ff5722'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#14e4ffd6'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    link: {
        display: 'flex',
        textDecoration: 'none',
        color: 'grey'
    },
    groupIconsRight: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    }
}));

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
    };
};

const AppBarComponent = (props) => {
    const classes = useStyles();
    const [statusDrawer, setStatusDrawer] = useState(props.statusDrawer ? props.statusDrawer : true);
    const [pagePaths, setPagePaths] = useState([]);

    const handleDrawerOpen = () => {
        if (props.handleDrawer)
            props.handleDrawer(true)
        setStatusDrawer(true);
    }

    const handleSignOut = () => {
        if (props.onSignOut)
            props.onSignOut()
    }

    useEffect(() => {
        setStatusDrawer(props.statusDrawer)
    }, [props.statusDrawer])

    useEffect(() => {
        if (props.PageInfos && props.PageInfos.pagePaths && props.PageInfos.pagePaths.length !== 0) {
            setPagePaths(props.PageInfos.pagePaths)
        }
        else {
            setPagePaths([{ link: "/", title: "Trang chủ", icon: <HomeIcon /> }])
        }
    }, [props.PageInfos])

    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, statusDrawer && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="primary"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, statusDrawer && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="primary" noWrap className={classes.title}>
                        <Breadcrumbs aria-label="breadcrumb">
                            {
                                pagePaths.map((item, index) => {
                                    if (item.link.length === 0) {
                                        return (
                                            <Typography color="textPrimary" className={classes.link} key={index}>
                                                {React.cloneElement(item.icon)}
                                                {item.title}
                                            </Typography>
                                        )
                                    }
                                    else {
                                        return (
                                            <Link color="primary" to={item.link} className={classes.link} key={index}>
                                                {React.cloneElement(item.icon)}
                                                {item.title}
                                            </Link>
                                        )
                                    }
                                })
                            }
                        </Breadcrumbs>
                    </Typography>
                    <Paper elevation={0} className={classes.groupIconsRight}>
                        <IconButton color="primary">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="primary" onClick={handleSignOut}>
                            <SignOut />
                        </IconButton>
                    </Paper>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);