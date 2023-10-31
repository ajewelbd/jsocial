import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import User from "../types/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type StateContext = {
    currentUser: User,
    token: string,
    setCurrentUser: Dispatch<SetStateAction<User>>,
    setToken: Dispatch<SetStateAction<string>>,
}

const StateContext = createContext<StateContext>({
    currentUser: {
        address: "",
        city: "",
        country: "",
        gender: 0,
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        username: ""
    },
    token: "",
    setCurrentUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User>({
        address: "",
        city: "",
        country: "",
        gender: 0,
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        username: ""
    });
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token") as string;
        console.log({token})
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get("user").then(({ data }) => {
                setCurrentUser({
                    ...data,
                    token
                })
            })
        } else {
            navigate("/");
        }
    }, [])

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            token,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const userStateContext = () => useContext(StateContext);