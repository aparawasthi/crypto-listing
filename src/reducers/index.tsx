import { combineReducers } from 'redux';
import { FormReducer } from './FormReducer';

const rootReducer = combineReducers({
    form: FormReducer,
});

export default rootReducer;
