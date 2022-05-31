import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AuthRouter from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import ApplicationRouter from './ApplicationRouter';
import PublicRoutes from './PublicRoutes';
import Home from '../pages/Home';

const HelperRouters = () =>{

    const isLogged = true;
    const isVerified = true; //esta es para que confirme su cuenta por mail
    //por el momento no la usaremos

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth/*" 
            element={
            <PublicRoutes isLogged={isLogged} >
                <AuthRouter/>
            </PublicRoutes>
                } />
            <Route path="/app/*"
            element={
                <PrivateRoutes isLogged={isLogged} isVerified={isVerified}>
                    <ApplicationRouter/>
                </PrivateRoutes>
            }
            />
        </Routes>
    )
}

export default HelperRouters;