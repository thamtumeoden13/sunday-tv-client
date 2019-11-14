import { combineReducers } from 'redux';
import { pageInfos } from './pageInfos';

const reducers = combineReducers({
    PageInfosModule: pageInfos,
});

export default reducers;