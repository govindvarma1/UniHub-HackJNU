import React, { useEffect } from "react";
import { useAdminAuth } from '../Context/AdminAuthContext';
import { CheckLogin } from '../Utils/CheckLogin';
import { NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../Components/Layouts/AdminLayout";
import { CheckAdminLogin } from "../Utils/CheckAdminLogin";



export default function ProjectList() {

    const { isLoggedIn, login, logout } = useAdminAuth();
    //const navigate = useNavigate();
    
    useEffect(() => {
        async function VerifyLogin() {
            const response = await CheckAdminLogin();
            if (response === true) {
                //navigate("/admin/login")
                login();
            }
            console.log(response);
        }
        VerifyLogin();
    }, [])

  

    return  (
        <>
 <>
            {isLoggedIn && (
                <AdminLayout>
                    <h2>Project List </h2>
                   
                    {/* Your dashboard content */}
                </AdminLayout>
            )}
        </>
        </>

        
    );
}





