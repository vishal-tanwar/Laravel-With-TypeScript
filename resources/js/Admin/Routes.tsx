import Dashboard from "./pages/Dashboard";
import React from "react";
import { Route } from "react-router-dom";
import AdminRoute from "../utils/AdminRoute";
import Login from "./Login";
import AdminNotFount from "./pages/AdminNotFount";

export function AdminRoutes() {
    return (
        <>
            <Route path="/admin" element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/*" element={<AdminNotFount />} />
            </Route>
            <Route path="/admin/login" element={<Login />} />
        </>
    )
}