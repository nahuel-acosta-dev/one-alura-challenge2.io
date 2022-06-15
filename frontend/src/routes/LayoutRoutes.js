import React from 'react';
import { Outlet } from "react-router-dom";
//cambiar nombre a PersistLogin, y enviar a carpeta features/auth
//guardar tokens en cookies una vez abierta la sesion.
//cada vez que se reinicie el navegador obtener los tokens de session y guardalos en setCredentials
//Si cierra la session limpiar los tokens de cookies

const LayoutRoutes = () => {
    return <Outlet />
}

export default LayoutRoutes;