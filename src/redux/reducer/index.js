/**************************************
*
*
*        INDEX OF REDUCER
*            indexer
*
*
***************************************/

import { combineReducers } from 'redux';

// importing reducer
import notes from './NotesReducer';
import CategoriesReducer from './CategoriesReducer';

// reducer combinator
const AppReducer = combineReducers({
    notes,
    CategoriesReducer
});

export default AppReducer;