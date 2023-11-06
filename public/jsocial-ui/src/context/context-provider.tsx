import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import User from "../types/User";

type StateContext = {
    currentUser: User,
    token: string,
    setCurrentUser: Dispatch<SetStateAction<User>>,
    setToken: Dispatch<SetStateAction<string>>,
}

export const StateContext = createContext<StateContext>({
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
    setCurrentUser: () => { },
    setToken: () => { }
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