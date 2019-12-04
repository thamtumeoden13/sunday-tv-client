
import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import PeopleIcon from '@material-ui/icons/People';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
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
                menuName: 'Catalogs',
                menuTitle: 'Mục lục',
                linkTo: '/catalog',
                menuIcon: <PermMediaIcon />,
                subMenu: [
                    {
                        menuName: 'Posters',
                        menuTitle: 'Hình ảnh',
                        linkTo: '/poster',
                        menuIcon: <PhotoCameraIcon />,
                        subMenu: [
                        ]
                    },
                    {
                        menuName: 'Categories',
                        menuTitle: 'Danh Mục',
                        linkTo: '/category',
                        menuIcon: <PermMediaIcon />,
                        subMenu: [
                        ]
                    },
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