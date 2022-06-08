import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },

    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.modifiers),
    devTools: true //cambiar a false al llevar a produccion
})