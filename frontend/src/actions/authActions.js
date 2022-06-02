import {types} from '../types/authTypes';

export const googleLogin = (id, username) => {
    return {
        type: types.login,
        payload: {
            id,
            username,    
        }
    };
};