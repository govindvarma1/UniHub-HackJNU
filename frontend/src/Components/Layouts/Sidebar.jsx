import React, { useEffect } from "react";
import { useAdminAuth } from '../../Context/AdminAuthContext';
// import { CheckLogin } from '../Utils/CheckLogin';
import { NavLink, useNavigate } from "react-router-dom";
import { CheckLogin } from "../../Utils/CheckLogin";
import { CheckAdminLogin } from "../../Utils/CheckAdminLogin";

const Sidebar = () => {

    const { isLoggedIn, login, logout } = useAdminAuth();
    const navigate = useNavigate();
    useEffect(() => {
        async function VerifyLogin() {
            const response = await CheckAdminLogin();
            if (response === true) {
                login();
            }
            console.log(response);
        }
        VerifyLogin();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };


    const isActive = (match, location) => {
        // Check if the current location matches the NavLink's "to" prop
        if (!match) {
            return false;
        }
        return match.url === location.pathname;
    };

    return (
        <>
            <div className="w-48 h-screen fixed shadow-lg top-0 left-0  p-5">
                <NavLink
                    to="/admin"
                    activeclassname="bg-green-500"
                    className="block font-semibold text-black text-xl mb-4"
                >
                    Admin
                </NavLink>
               

                <NavLink
                    to="/admin/add-professor"
                    activeclassname="bg-green-500"
                    className="block font-semibold text-black text-xl mb-4"
                >
                    Add Professor
                </NavLink>

                <NavLink
                    to="/admin/professor-list"
                    activeclassname="bg-green-500"
                    className="block font-semibold text-black text-xl mb-4"
                >
                     Professors list
                </NavLink>

                <NavLink
                    to="/admin/projects"
                    activeclassname="bg-green-500"
                    className="block font-semibold text-black text-xl mb-4"
                >
                    Projects
                </NavLink>


               
                <div className="mb-4">
                    {isLoggedIn ? (
                        <p
                            // onClick={() => { logout() }}
                            onClick={handleLogout}
                            className="font-semibold text-black text-xl cursor-pointer hover:bg-blue-500 hover:text-white p-2 rounded"
                        >
                            Logout
                        </p>
                    ) : (
                        <NavLink
                            to="/admin/login"
                            activeclassname="bg-green-500"
                            className="block font-semibold text-black text-xl"
                        >
                            Login
                        </NavLink>
                    )}
                </div>

           
            </div>

        </>
    );
};

export default Sidebar;