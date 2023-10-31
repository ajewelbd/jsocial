import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../home/dashboard";
import Login from "./login";
import Register from "./register";

const routes = [
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]

const router = createBrowserRouter(routes)

export default router;