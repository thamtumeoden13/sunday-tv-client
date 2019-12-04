import { actions } from './constants'

export const setLoadingApp = (isLoading) => ({
    type: actions.SET_LOADING_APP,
    isLoading: isLoading,
});

