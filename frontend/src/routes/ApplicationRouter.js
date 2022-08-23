import React from 'react';
import {Routes,Route} from 'react-router-dom';
import HomeApp from '../pages/HomeApp';
import SaveScreen from '../pages/SaveScreen';
import GameStarts from '../pages/GameStarts';
import GameMode from '../pages/GameMode';
import ProfileScreen from '../pages/ProfileScreen';
import InvitationScreen from '../pages/InvitationScreen';
import NotVerified from '../pages/NotVerified';
import SetPassword from '../pages/SetPassword';
import { Navigate } from 'react-router-dom';

const ApplicationRouter = () =>{
    //Aqui van las rutas que puede ver el usuario logueado

    return (
        <>
            <Routes>
                <Route path="home" element={<HomeApp/>} />
                <Route path="gamemode" element={<GameMode/>} />
                <Route path="profile" element={<ProfileScreen/>} />
                <Route path="set_password" element={<SetPassword/>} />
                <Route path="local/savescreen" element={<SaveScreen/>} />
                <Route path="local/gamestarts" element={<GameStarts/>} />
                <Route path="local/fast_play/gamestarts" element={<GameStarts/>} />
                <Route path="online/savescreen" element={<SaveScreen/>} />
                <Route path="online/invitation" element={<InvitationScreen/>}/>
                <Route path="online/gamestarts" element={<GameStarts/>} />
                <Route path="notverified" element={<NotVerified/>} />
                <Route path="*" element={<p>404</p>}></Route>
                {/*Redirect*/}
                <Route path="" element={<Navigate to="home"/>} />
            </Routes>
        </>
    )
}

export default ApplicationRouter;