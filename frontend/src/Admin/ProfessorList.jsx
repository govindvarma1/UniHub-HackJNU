// import React, { useEffect } from "react";
import { useAdminAuth } from '../Context/AdminAuthContext';
// import { CheckLogin } from '../Utils/CheckLogin';
import { NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../Components/Layouts/AdminLayout";
import { CheckAdminLogin } from "../Utils/CheckAdminLogin";

import React, { useEffect, useState } from "react";
import { GetSingleUniversityRoute, GetUniversitiesRoute } from "../Utils/APIRoutes";
import Header from "../Components/Layouts/Header";
import Footer from "../Components/Layouts/Footer";
import UniversityCard from "../Components/UniversityComponents/UniversityCard";
import UniversitySearchBar from "../Components/UniversityComponents/UniversitySearchBar";
import ProfessorCard from './ProfessorsCard';

export default function ProfessorList() {




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


    const [university, setUniversity] = useState([]);
    //  const {DisplayUniversities, setDisplayUniversities} = useState([]);
    // const [search, setSearch] = useState("");

    useEffect(() => {
        async function GetUniversity() {
            try {
                const response = await fetch(GetSingleUniversityRoute, {
                    method: "GET",
                  });
                  if (!response.ok) {
                    throw new Error(`API request failed with status: ${response.status}`);
                  }
                  
                const text = await response.text();
                console.log("API Response:", text);

                const data = await response.json();
                console.log("API Response:", data);
                setUniversity(data);
            } catch (error) {
                console.error(error);

                
            }
        }
        GetUniversity();
    }, []);

    // function handleSearch(event) {
    //     setSearch(event.target.value);
    // }

    return (
        <>

            {isLoggedIn && (
                <AdminLayout>
                    <h2>Professor list: </h2>
                    <main className="px-16 py-8 mt-16">

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {university &&

                                <ProfessorCard

                                    university={university}

                                />

                            }
                        </div>
                    </main>

                    {/* Your dashboard content */}
                </AdminLayout>
            )}


            {/* <Footer /> */}
        </>
    );
}





