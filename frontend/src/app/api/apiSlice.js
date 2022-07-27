import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCredentials, logOut, selectCurrentUser} from '../../features/auth/authSlice';
import {useSelector} from 'react-redux';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/hangman/api/',
    credentials: 'include',
    'prepareHeaders': (headers, {getState}) => {
        const token = getState().auth.token;
        if(token) {
            headers.set("Content-Type", "application/json");
            headers.set("Accept", "*/*");
            headers.set("Authorization", `Bearer ${token}`);//si no funciona probar authorization
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result?.error?.status === 403){
        console.log('sending refresh token');
        const refresh = api.getState().auth.refresh
        // send refresh token to get new acces token
        const refreshResult = await baseQuery({url:'token/refresh/', method:'POST', body: {
            "refresh": refresh
        }}, api, extraOptions)
        if (refreshResult?.data){
            const user = api.getState().auth.user;
            // store the new token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            //retry the original query with new access Token
            result = await baseQuery(args, api, extraOptions);
        }
        else{
            api.dispatch(logOut());
        }

    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})