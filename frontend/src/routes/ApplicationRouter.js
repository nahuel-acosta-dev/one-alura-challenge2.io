import React from 'react';
import {Routes,Route} from 'react-router-dom';
import HomeApp from '../pages/HomeApp';
import SaveScreen from '../pages/SaveScreen';
import GameStarts from '../pages/GameStarts';
import NotVerified from '../pages/NotVerified';


const ApplicationRouter = () =>{
    //Aqui van las rutas que puede ver el usuario logueado

    return (
        <>
            <Routes>
                <Route path="home" element={<HomeApp/>} />
                <Route path="savescreen" element={<SaveScreen/>} />
                <Route path="gamestarts" element={<GameStarts/>} />
                <Route path="notverified" element={<NotVerified/>} />
            </Routes>
        </>
    )
}

export default ApplicationRouter;