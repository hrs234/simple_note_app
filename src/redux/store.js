/**************************************
*       
*
*       HERE DATA STORED
*
*
***************************************/

import {createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

// reducer
// import NotesReducer from './reducer/NotesReducer';
// import CategoriesReducer from './reducer/CategoriesReducer';

import rootReducer from './reducer';

// logger
const logger = createLogger({});

// defining stores
const store = createStore(
    rootReducer,
    applyMiddleware(
        logger,
        promiseMiddleware
    )
);

// export the store its can be used for another file
export default store;