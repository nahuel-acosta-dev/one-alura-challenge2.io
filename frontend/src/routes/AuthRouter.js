import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';

const AuthRouter = () =>{

    //Aqui van las rutas de Login,registro y reinicio de contraseña
    //se mostraran si el usuario no se a logueado
    //exact solo se usa cuando tenemos rutas de similares nombres
    return(
        <>
            <Routes>
                <Route exact path='/login' element={<LoginScreen/>} />
                <Route exact path='/register' element={<RegisterScreen/>} />
                <Route exact path='/reset' element={<LoginScreen/>} />
            </Routes>
        </>
    )
}

export default AuthRouter;