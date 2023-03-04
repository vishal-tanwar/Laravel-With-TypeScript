import React from 'react';
import {Outlet,Navigate, useLocation} from 'react-router-dom';
import { auth } from './Config';



const AdminRoute = () => {
   const location = useLocation();
    return (
          auth.token ? location.pathname == "/admin/" ?  <Navigate to="/admin/dashboard" /> : <Outlet /> : <Navigate to={`/admin/login?redirectTo=${location.pathname}`} />
    )
}

export default AdminRoute;