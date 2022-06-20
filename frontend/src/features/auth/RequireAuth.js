import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const local = localStorage.getItem("authTokens")
    const location = useLocation();

    return (
        local ? 
        <Outlet />
        :
        <Navigate to="/auth/login" state={{from: location}} replace />
        )
}

export default RequireAuth;