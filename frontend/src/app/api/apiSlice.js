import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCredentials, logOut} from '../api/apiSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    'prepareHeaders': (headers, {getState}) => {
        const token = getState().auth.token;
        if(token) {
            headers.set("Authorization", `Bearer ${token}`);//si no funciona probar authorization
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    //Si nuestro error no devuelve 403 ubicar el codigo correspondiente o solamente error
    if (result?.error.originalStatus === 403){
        console.log('sending refresh token');
        // send refresh token to get new acces token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);
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