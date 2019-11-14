import { actions } from './constants'

export const setPagePath = (pagePaths) => ({
    type: actions.SET_PAGE_PATH,
    pagePaths: pagePaths,
});
