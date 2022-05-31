import React from 'react';
import {Navigate} from 'react-router-dom';

//Solo usamos Navigate
const PublicRoutes = ({children,isLogged}) =>{
    //Aqui se administran las rutas que todos pueden observar es decie sin loguearse
    return isLogged ? <Navigate to="/app/home" /> : children;
}

export default PublicRoutes;