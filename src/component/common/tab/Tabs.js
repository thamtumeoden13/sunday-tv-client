import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const TabContainer = (props) => {
    const [value, setValue] = useState(0);
    const [listTab, setListTab] = useState(props.listTab);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Fragment>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
            >
                {
                    listTab && listTab.length > 0 &&
                    listTab.map((item, index) => {
                        return <Tab label={item.title} icon={React.cloneElement(item.icon)} {...a11yProps(index)} key={index} />
                    })
                }
            </Tabs>
            {
                listTab && listTab.length > 0 &&
                listTab.map((item, index) => {
                    return (
                        <TabPanel value={value} index={index} key={index}>
                            {props.children
                                && props.children[index]
                                ? React.cloneElement(props.children[index])
                                : <div>{item.title}</div>
                            }
                        </TabPanel>
                    )
                })
            }
        </Fragment>
    );
}
export default TabContainer;