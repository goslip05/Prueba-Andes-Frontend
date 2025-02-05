import { createBrowserRouter } from "react-router-dom";
import Login from "../views/auth/Login";
import AuthLayout from "../layouts/AuthLayout";


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
    }
    
])

export default router