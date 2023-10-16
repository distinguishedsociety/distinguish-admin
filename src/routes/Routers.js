import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NotFound from "../pages/404";
import { Profile } from "../pages/Profile/Profile";
import Dashboard from "../pages/Dashboard";

export const Routers = () => {
    return (
        <>
            <Route exact path="/moas/viewenduser">
                <Profile />
            </Route>
            <Route>
                <Sidebar />
                <Route exact path="/moas/admin/customer/home">
                    <Dashboard />
                </Route>
            </Route>
        </>
    );
};
