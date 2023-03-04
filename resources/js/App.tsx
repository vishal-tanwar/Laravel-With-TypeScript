import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";
import {AdminRoutes} from './Admin/Routes';
import { AuthProvider } from "./hooks/Auth";
import NotFound from "./pages/NotFound";

const App = () => {
   return( 
    <AuthProvider>
        <Routes>
            {/* Admin Routes  */}
            { AdminRoutes() }
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </AuthProvider>
   )
}
export default App;