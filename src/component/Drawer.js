import React, { useEffect, useState, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import AppBarMenu from '../constant/AppBarMenu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        marginRight: 10
    },
    media: {
        width: 200,
        height: 40,
    },
}));

const DrawerComponent = (props) => {
    const classes = useStyles();
    const [statusDrawer, setStatusDrawer] = useState(props.statusDrawer ? props.statusDrawer : true);
    const handleDrawerClose = () => {
        if (props.handleDrawer)
            props.handleDrawer(false)
        setStatusDrawer(false);
    }

    useEffect(() => {
        setStatusDrawer(props.statusDrawer)
    }, [props.statusDrawer])

    return (
        <Fragment>
            <CssBaseline />
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !statusDrawer && classes.drawerPaperClose),
                }}
                open={statusDrawer}
            >
                <div className={classes.toolbarIcon}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            // image={require("../img/logoSundayTv.jpg")}
                            image={process.env.PUBLIC_URL + '/logoSundayTv.jpg'}
                            title="Contemplative Reptile"
                        />
                    </Card>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                {
                    AppBarMenu.map((itemGroupMenu, indexGroupMenu) => {
                        return (
                            <Fragment key={indexGroupMenu}>
                                <Divider />
                                <ListSubheader>{itemGroupMenu.GroupMenuName}</ListSubheader>
                                <List>
                                    {itemGroupMenu.GroupMenuDetail && itemGroupMenu.GroupMenuDetail.length > 0 &&
                                        itemGroupMenu.GroupMenuDetail.map((itemMenu, indexMenu) => {
                                            const Icon = itemMenu.MenuIcon;
                                            return (
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        {React.cloneElement(Icon)}
                                                    </ListItemIcon>
                                                    <ListItemText primary={itemMenu.MenuTitle} />
                                                </ListItem>
                                            )
                                        })

                                    }
                                </List>
                                {/* <List>{mainListItems}</List> */}
                            </Fragment>
                        )
                    })
                }
                {/* <Divider />
                <List>{secondaryListItems}</List> */}
            </Drawer>
        </Fragment>
    );
}
export default DrawerComponent;