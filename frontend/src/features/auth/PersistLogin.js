import React, {useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import { Outlet } from "react-router-dom";
import {useDispatch} from "react-redux";
import { setCredentials } from './authSlice';
import {useLoginMutation} from './authApiSlice';
//cambiar nombre a PersistLogin, y enviar a carpeta features/auth
//guardar tokens en cookies una vez abierta la sesion.
//cada vez que se reinicie el navegador obtener los tokens de session y guardalos en setCredentials
//Si cierra la session limpiar los tokens de cookies

const PersistLogin = () => {
    const dispatch = useDispatch();
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? 
    JSON.parse(localStorage.getItem("authTokens")) : null);
    
    useEffect(() =>  {
        const dataUser = () => {
            if (authTokens != null){
                dispatch(setCredentials({ ...authTokens, username: authTokens.username}))
            }
        }

        dataUser();
    }, []);

    return <Outlet />
}

export default LayoutRoutes;