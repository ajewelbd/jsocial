import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../home/dashboard";
import Login from "./login";

const AuthContext = createContext({});
export const AuthData = () => useContext(AuthContext);

export function AuthWrapper() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        token: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token") as string;
        if (token) {
            axios.get("http://127.0.0.1:8000/api/posts").then(({ data }) => {
                setUser({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    avatar: "",
                    token
                })
            })
        }
    }, [])

    return user.token ?
        <AuthContext.Provider value={{ user }}>
            <Dashboard />
        </AuthContext.Provider>
        :
        <Login />
}