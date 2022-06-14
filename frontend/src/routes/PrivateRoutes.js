import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../features/auth/authSlice';


const PrivateRoutes = ({children}) =>{
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    //Aqui se administran las rutas que solo los usuarios logueados pueden ver
 return (
    <>
        {
            (user == true && token === true) ?
            //<Navigate to="/app/home" /> : <Navigate to="/app/notverified" />
            //children : <Navigate to="/app/notverified" />
            children : <Navigate to="/auth/login" />
        }

        {/*
            user ? children : <Navigate to="/auth/login" />
*/}
    </>
 );
}

export default PrivateRoutes;