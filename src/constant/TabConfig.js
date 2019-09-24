
import React from 'react'

import BurstModeIcon from '@material-ui/icons/BurstMode';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PhoneIcon from '@material-ui/icons/Phone'
import PersonPinIcon from '@material-ui/icons/PersonPin'

const TabCatalogConfig = [
    {
        key: 'one',
        index: 1,
        title: 'Item One',
        icon: <PhoneIcon />,
    },
    {
        key: 'two',
        index: 2,
        title: 'Item Two',
        icon: <FavoriteIcon />,
    },
    {
        key: 'three',
        index: 3,
        title: 'Item Three',
        icon: <PersonPinIcon />,
    },

];

const TabCatalogConfig1 = [
    {
        key: 'one',
        index: 1,
        title: 'Item One',
        icon: <PhoneIcon />,
    },
    {
        key: 'two',
        index: 2,
        title: 'Item Two',
        icon: <FavoriteIcon />,
    },
    {
        key: 'three',
        index: 3,
        title: 'Item Three',
        icon: <PersonPinIcon />,
    },

];

const TabCategoryConfig = [
    {
        key: 'one',
        index: 1,
        title: 'Chi Tiết Danh Mục',
        icon: <AssignmentIcon />,
    },
    {
        key: 'two',
        index: 2,
        title: 'Nội dung Danh Mục',
        icon: <FavoriteIcon />,
    },
    {
        key: 'three',
        index: 3,
        title: 'Danh sách hình ảnh',
        icon: <BurstModeIcon />,
    },

];
export { TabCatalogConfig, TabCatalogConfig1, TabCategoryConfig };