import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

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
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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
    nested: {
        paddingLeft: theme.spacing(4),
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

    const [open, setOpen] = useState({
        settings: [
            { id: "Catalogs", open: false },
            { id: "Customers", open: false },
            { id: "Diocese", open: false }
        ]
    });
    const handleClick = (id) => {
        console.log({ id, open })
        setOpen(open => ({
            ...open,
            settings: open.settings.map(item =>
                item.id === id ? { ...item, open: !item.open } : item
            )
        }));
    };

    const collapseSubMenu = (itemMenu) => {
        console.log({ itemMenu })
        return (
            <div key={itemMenu.menuName} style={{ textDecoration: 'none', color: 'grey' }}>
                <ListItem button onClick={() => handleClick(itemMenu.menuName)}>
                    <ListItemIcon>
                        {React.cloneElement(itemMenu.menuIcon)}
                    </ListItemIcon>
                    <ListItemText primary={itemMenu.menuTitle} />
                    {open.settings.find(item => item.id === itemMenu.menuName).open
                        ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                    in={open.settings.find(item => item.id === itemMenu.menuName).open}
                    timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            itemMenu.subMenu.map((itemSub, itemIndex) => {
                                return (
                                    <Link to={itemSub.linkTo} key={itemIndex} style={{ textDecoration: 'none', color: 'grey' }}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                {React.cloneElement(itemSub.menuIcon)}
                                            </ListItemIcon>
                                            <ListItemText primary={itemSub.menuTitle} />
                                        </ListItem>
                                    </Link>
                                )
                            })
                        }
                    </List>
                </Collapse>
            </div>
        )

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
                                {itemGroupMenu
                                    && itemGroupMenu.groupMenuName
                                    && itemGroupMenu.groupMenuName.length > 0
                                    && <ListSubheader>{itemGroupMenu.groupMenuName}</ListSubheader>
                                }
                                <List>
                                    {itemGroupMenu.groupMenuDetail && itemGroupMenu.groupMenuDetail.length > 0 &&
                                        itemGroupMenu.groupMenuDetail.map((itemMenu, indexMenu) => {
                                            if (itemMenu.subMenu.length === 0) {
                                                return (
                                                    <Link to={itemMenu.linkTo} key={indexMenu} style={{ textDecoration: 'none', color: 'grey' }}>
                                                        <ListItem button>
                                                            <ListItemIcon>
                                                                {React.cloneElement(itemMenu.menuIcon)}
                                                            </ListItemIcon>
                                                            <ListItemText primary={itemMenu.menuTitle} />
                                                        </ListItem>
                                                    </Link>
                                                )
                                            }
                                            else {
                                                return collapseSubMenu(itemMenu)
                                            }
                                        })
                                    }
                                </List>
                            </Fragment>
                        )
                    })
                }
            </Drawer>
        </Fragment>
    );
}
export default DrawerComponent;