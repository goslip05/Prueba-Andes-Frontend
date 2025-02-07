import { createBrowserRouter } from "react-router-dom";
import Login from "../views/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Inicio from "../views/admin/Inicio";
import Layout from "../layouts/Layout";
import ListTask from "../views/admin/task/ListTask";
import EditTask from "../views/admin/task/EditTask";
import AddTask from "../views/admin/task/AddTask";
import Register from "../views/auth/Register";
import RegisterLayout from "../layouts/RegisterLayout";


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
        path: '/register',
        element: <RegisterLayout />,
        children: [
            {
                index: true,
                element: <Register />
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
            },
            {
                path: '/panel/tareas',
                element: <ListTask />
            },
            {
                path: '/panel/tareas/editar/:taskId',
                element: <EditTask />
            },
            {
                path: '/panel/tareas/crear',
                element: <AddTask />
            }
        ]
    }
    
])

export default router