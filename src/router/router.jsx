import { createBrowserRouter } from "react-router-dom";
import Login from "../views/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Inicio from "../views/admin/Inicio";
import Layout from "../layouts/Layout";


const router = createBrowserRouter([
    {
        path: '/login',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />
            }
        ]
    },
    {
        path: '/panel',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    }
    
])

export default router