import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AuthRouter from './AuthRouter';
import ApplicationRouter from './ApplicationRouter';
import PublicRoutes from './PublicRoutes';
import Home from '../pages/Home';
import RequireAuth from '../features/auth/RequireAuth';
import PersistLogin from '../features/auth/PersistLogin';


const HelperRouters = () =>{

    return (
      <Routes>
      <Route path="/" element={<PersistLogin />}>
          {/* public routes */}
          <Route index element={<Home/>} />
          <Route path="auth/*" 
          element={
            <PublicRoutes>
              <AuthRouter/>
            </PublicRoutes>} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="app/*" element={<ApplicationRouter/>} />
        </Route>
      </Route>
    </Routes>

    )
}

export default HelperRouters;