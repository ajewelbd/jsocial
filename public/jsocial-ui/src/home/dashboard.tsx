import { useEffect, useState } from "react";
import { userStateContext } from "../context/context-provider";
import Header from "../layout/header";
import LeftSidebar from "../layout/left-sidebar";
import MainContent from "./main-content";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


export default function Dashboard() {
    const _token = localStorage.getItem("token") as string;
    if(!_token) return <Navigate to="/login" />;
    axios.defaults.headers.common.Authorization = `Bearer ${_token}`;

    const {token, setToken, setCurrentUser} = userStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getUser = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get("user");
            setIsLoading(false)
            setCurrentUser({
                ...data,
                token
            })
        } catch(e: any) {
            console.log(e.response?.status)
            if (e.response?.status === 401) {
                localStorage.removeItem("token")
                return navigate("/login");
            }
        }
        
    }
    
    useEffect(() => {
            setToken(_token);
            getUser()
    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            {isLoading ?
            (
                <div className="translate-y-52">
                    <h1 className="text-center">Loading...</h1>
                </div>
            )
            :
            (
                <>
                    <Header />
                    <LeftSidebar />
                    <MainContent />
                </>
            )
            }
            
        </div>
    )
}