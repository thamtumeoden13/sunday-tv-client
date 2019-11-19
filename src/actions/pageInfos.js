import { actions } from './constants'

export const setPagePath = (pagePaths) => ({
    type: actions.SET_PAGE_PATH,
    pagePaths: pagePaths,
});


export const setLoadingDetail = (isLoading) => ({
    type: actions.SET_LOADING_DETAIL,
    isLoading: isLoading,
});

