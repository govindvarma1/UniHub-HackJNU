import React, { useEffect } from "react";
import { useAdminAuth } from '../Context/AdminAuthContext';
import { CheckLogin } from '../Utils/CheckLogin';
import { NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../Components/Layouts/AdminLayout";
import { CheckAdminLogin } from "../Utils/CheckAdminLogin";



export default function Admin() {

    const { isLoggedIn, login, logout } = useAdminAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function VerifyLogin() {
            const response = await CheckAdminLogin();
            if (response === true) {
                //navigate("/admin/login")
                login();
            }else{
                navigate("/admin/login")

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
                    <h2>Admin </h2>
                   
                    {/* Your dashboard content */}
                </AdminLayout>
            )}
        </>
        </>

        
    );
}





