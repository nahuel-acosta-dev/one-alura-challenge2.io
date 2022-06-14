import React from 'react';
import {Outlet} from 'react-router-dom'

const Home = () =>{
    return <>
    Bienvenido al inicio
    <Outlet />
    </>
}

export default Home;