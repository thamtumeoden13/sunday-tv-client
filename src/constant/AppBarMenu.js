
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
        GroupMenuKey: 1,
        GroupMenuName: 'group menu 1',
        GroupMenuDetail: [
            {
                MenuName: 'dashboards',
                MenuTitle: 'Trang chủ',
                LinkTo: '/',
                MenuIcon: <DashboardIcon />,
                SubMenu: [
                ]
            },
            {
                MenuName: 'Catalogs',
                MenuTitle: 'Mục lục',
                LinkTo: '',
                MenuIcon: <PermMediaIcon />,
                SubMenu: [
                ]
            },
            {
                MenuName: 'Orders',
                MenuTitle: 'Đặt hàng',
                LinkTo: '',
                MenuIcon: <ShoppingCartIcon />,
                SubMenu: [
                ]
            },
            {
                MenuName: 'Customers',
                MenuTitle: 'Khách hàng',
                LinkTo: '',
                MenuIcon: <PeopleIcon />,
                SubMenu: [
                ]
            },
        ]
    },
    {
        GroupMenuKey: 2,
        GroupMenuName: 'group menu 2',
        GroupMenuDetail: [
            {
                MenuName: 'CurrentMonth',
                MenuTitle: 'Tháng gần nhất',
                LinkTo: '/',
                MenuIcon: <AssignmentIcon />,
                SubMenu: [
                ]
            },
            {
                MenuName: 'LastQuarter',
                MenuTitle: 'Quý cuối cùng',
                LinkTo: '',
                MenuIcon: <AssignmentIcon />,
                SubMenu: [
                ]
            },
            {
                MenuName: 'YearEnd',
                MenuTitle: 'Cuối năm',
                LinkTo: '',
                MenuIcon: <AssignmentIcon />,
                SubMenu: [
                ]
            }
        ]
    },

];

export default AppBarMenu;