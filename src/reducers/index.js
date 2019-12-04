import { combineReducers } from 'redux';
import { pageInfos } from './pageInfos';
import { appInfos } from './appInfos';

const reducers = combineReducers({
    PageInfosModule: pageInfos,
    AppInfosModule: appInfos,
});

export default reducers;