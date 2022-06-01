import {authTypes} from '../types/authTypes';

export const authReducers = (state, action) => {
    switch(action.type){
        case types.login:
            return {
                name: "nahuel",
                id: "1"
            }
        case types.logout:
            return {
            }

        default:
            return state;
    }
}