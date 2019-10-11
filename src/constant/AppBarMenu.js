
import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TwitterIcon from '@material-ui/icons/Twitter';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const AppBarMenu = [
    {
        groupMenuKey: 1,
        groupMenuName: '',
        groupMenuDetail: [
            {
                menuName: 'dashboards',
                menuTitle: 'Trang chủ',
                linkTo: '/',
                menuIcon: <DashboardIcon />,
                subMenu: [
                ]
            },
            {
                menuName: 'Categories',
                menuTitle: 'Mục lục',
                linkTo: '/category',
                menuIcon: <PermMediaIcon />,
                subMenu: [
                ]
            },
            {
                menuName: 'Posters',
                menuTitle: 'Hình ảnh',
                linkTo: '/poster',
                menuIcon: <PhotoCameraIcon />,
                subMenu: [
                ]
            },
            {
                menuName: 'Customers',
                menuTitle: 'Khách hàng',
                linkTo: '/customer',
                menuIcon: <PeopleIcon />,
                subMenu: [
                ]
            },
        ]
    },
    {
        groupMenuKey: 2,
        groupMenuName: '',
        groupMenuDetail: [
            {
                menuName: 'Diocese',
                menuTitle: 'Giáo Phận',
                linkTo: '/diocese',
                menuIcon: <TwitterIcon />,
                subMenu: [
                ]
            },
            {
                menuName: 'Deanery',
                menuTitle: 'Giáo Hạt',
                linkTo: '/deanery',
                menuIcon: <VerifiedUserIcon />,
                subMenu: [
                ]
            },
            {
                menuName: 'Parish',
                menuTitle: 'Giáo xứ',
                linkTo: '/parish',
                menuIcon: <WhatshotIcon />,
                subMenu: [
                ]
            },
        ]
    },

];

export default AppBarMenu;