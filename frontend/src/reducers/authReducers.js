import {types} from '../types/authTypes';

export const authReducers = (state = {}, action) => {
    switch(action.type){
        case types.login:
            return action.payload;
        case types.logout:
            return {}

        default:
            return state;
    }
}