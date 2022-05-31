import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NotRegister from '../pages/NotRegister';

const AuthRouter = () =>{

    //Aqui van las rutas de Login,registro y reinicio de contraseña
    //se mostraran si el usuario no se a logueado
    return(
        <>
            <Routes>
                <Route path='/login' element={<NotRegister/>} />
                <Route path='/register' element={<NotRegister/>} />
                <Route path='/reset' element={<NotRegister/>} />
            </Routes>
        </>
    )
}

export default AuthRouter;