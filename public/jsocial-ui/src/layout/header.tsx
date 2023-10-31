import { AcademicCapIcon, Bars3BottomLeftIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { userStateContext } from "../context/context-provider";

export default function Header() {
    const [userMenuOpenStatus, setUserMenuOpenStatus] = useState<boolean>(false);
    const { currentUser } = userStateContext();

    const handleUserMenuStatus = () => {
        setUserMenuOpenStatus(!userMenuOpenStatus);
    }

    // useEffect(() => {
    //     const dropdownMenu = document.querySelector("#dropdown-user");
    //     dropdownMenu?.addEventListener("click", handleUserMenuStatus);

    //     return () => dropdownMenu?.removeEventListener("click", handleUserMenuStatus)
    // }, [])
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon className="w-6 h-6"/>
                        </button>
                        <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">JSocial</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" onClick={() => handleUserMenuStatus()}>
                                    <span className="sr-only">Open user menu</span>
                                    {/* <img className="w-8 h-8 rounded-full" src="" alt="user photo" /> */}
                                    <div className="w-9 h-8 bg-white rounded-full">
                                        <AcademicCapIcon className="h-5 w-5 mx-auto my-1.5 text-gray-800" />
                                    </div>
                                </button>
                            </div>
                            <div className={`absolute ${ userMenuOpenStatus ? "block" : "hidden"} top-9 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                        {currentUser.first_name} {currentUser.first_name}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                    {currentUser.email}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}