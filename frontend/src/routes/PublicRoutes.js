import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../features/auth/authSlice';
//Solo usamos Navigate
const PublicRoutes = ({children}) =>{
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    //Aqui se administran las rutas que todos pueden observar es decie sin loguearse
    return (user && token) ? <Navigate to="/app/home" /> : children;
}

export default PublicRoutes;