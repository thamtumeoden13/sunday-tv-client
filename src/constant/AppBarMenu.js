
import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
                ]
            },
            {
                menuName: 'Orders',
                menuTitle: 'Đặt hàng',
                linkTo: '/order',
                menuIcon: <ShoppingCartIcon />,
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
                menuName: 'CurrentMonth',
                menuTitle: 'Tháng gần nhất',
                linkTo: '/currentmonth',
                menuIcon: <AssignmentIcon />,
                subMenu: [
                ]
            },
            {
                menuName: 'LastQuarter',
                menuTitle: 'Quý cuối cùng',
                linkTo: '/lastquarter',
                menuIcon: <AssignmentIcon />,
                subMenu: [
                ]
            },
            {
                menuName: 'YearEnd',
                menuTitle: 'Cuối năm',
                linkTo: '/yearend',
                menuIcon: <AssignmentIcon />,
                subMenu: [
                ]
            }
        ]
    },

];

export default AppBarMenu;