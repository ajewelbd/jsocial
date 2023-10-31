import { AcademicCapIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Register() {
    return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div className="flex justify-center items-center gap-x-1 mb-5">
                <AcademicCapIcon className="w-6 h-6"/>
                <p className="font-bold text-center text-2xl">JSocial</p>
            </div>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <div className="px-5 py-7">
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input type="email" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                    <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <button type="button" className="flex items-center justify-center gap-x-2 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                        <span className="inline-block">Register</span>
                        <ArrowLongRightIcon className="w-4 h-4"/>
                    </button>
                </div>
                {/* <div className="p-5">
                    <div className="grid grid-cols-3 gap-1">
                        <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Google</button>
                        <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
                    </div>
                </div> */}
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-right whitespace-nowrap">
                            <NavLink to="/login">
                                <button className="flex items-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <CubeTransparentIcon className="w-4 h-4"/>
                                    <span className="inline-block ml-1">Login</span>
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}