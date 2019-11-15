
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';


export const DASHBOARD = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Thống Kê", icon: <WhatshotIcon /> }
    ],
}

export const DIOCESE = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Giáo Phận", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese/", title: "Giáo Phận", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese/", title: "Giáo Phận", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}

export const DEANERY = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Giáo Hạt", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese/", title: "Giáo Hạt", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese/", title: "Giáo Hạt", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}

export const CATEGORY = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Danh Mục", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/category/", title: "Danh Mục", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/category/", title: "Danh Mục", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}

export const POSTER = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Hình Ảnh", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/poster/", title: "Hình Ảnh", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/poster/", title: "Hình Ảnh", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ],
    view: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/poster/", title: "Hình Ảnh", icon: <WhatshotIcon /> },
        { link: "", title: "Chi Tiết", icon: <GrainIcon /> }
    ],
}