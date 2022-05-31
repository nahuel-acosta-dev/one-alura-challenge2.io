import React from 'react';
import {Navigate} from 'react-router-dom';

const PrivateRoutes = ({isLogged, isVerified,children}) =>{
    //Aqui se administran las rutas que solo los usuarios logueados pueden ver
 return (
    <>
        {
            (isLogged == true && isVerified === true) ?
            //<Navigate to="/app/home" /> //: <Navigate to="/auth/login" />
            children : <Navigate to="/app/notverified" />
        }

        {
            //isLogged ? children : <Navigate to="/auth/login" />
        }
    </>
 );
}

export default PrivateRoutes;