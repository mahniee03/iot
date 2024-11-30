import PageLayout from "../components/PageLayout";
import Dashboard from "../pages/Dashboard";
import Environment from "../pages/Environment";
import Device from "../pages/Device";
import Profile from "../pages/Profile";
import Dashboard2 from "../pages/Dashboard2";
import { Navigate } from "react-router-dom";


export const action = [
    {
        path: "/",
        element: <PageLayout/>,
        children: [
            {
                index: "dashboard",
                element: <Dashboard/>
            },
            {
                path: "dashboard2",
                element: <Dashboard2/>
            },
            {
                path: "environment",
                element: <Environment/>
            },
            {
                path: "device",
                element: <Device/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]