import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AuthRouter from './AuthRouter';
import ApplicationRouter from './ApplicationRouter';
import PublicRoutes from './PublicRoutes';
import Home from '../pages/Home';
import RequireAuth from '../features/auth/RequireAuth';
import LayoutRoutes from './LayoutRoutes';


const HelperRouters = () =>{

    /*return (
    <Routes>
      <Route path="/" element={<Home />}>*/
        {/* public routes */}
        {/*<Route index element={<Public />} />*/}
        //<Route path="login" element={<LoginScreen/>} />

        {/* protected routes */}
        /*<Route element={<RequireAuth />}>
          <Route path="app/home" element={<HomeApp />} />
        </Route>
      </Route>
    </Routes>
    )*/

    return (
      <Routes>
      <Route path="/" element={<LayoutRoutes />}>
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