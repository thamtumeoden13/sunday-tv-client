
import React from 'react';
import { actions } from '../actions/constants';

const initialState = {
    loading: false,
    error: false
};

export const appInfos = (state = initialState, action) => {

    switch (action.type) {
        case actions.SET_LOADING_APP:
            return {
                ...state,
                loading: action.isLoading
            }
        default:
            return {
                ...state
            }
    }
}