
import React from 'react';
import { actions } from '../actions/constants';
import HomeIcon from '@material-ui/icons/Home';

const initialState = {
    pagePaths: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        // { link: "/1", title: "Trang chủ1" },
    ],
    loading: false,
    error: false
};

export const pageInfos = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PAGE_PATH:
            return {
                ...state,
                pagePaths: action.pagePaths
            }
        default:
            return {
                ...state
            }
    }
}