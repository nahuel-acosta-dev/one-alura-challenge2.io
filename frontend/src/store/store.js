import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducers} from "../reducers/authReducers";

const reducers = combineReducers({
    auth: authReducers,
})

const composeEnhancers = 
(typeof window !== 'undefined' && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
compose;

export const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk))
    );//Unimportant changes not to merge, poor implementation of authentication frontend