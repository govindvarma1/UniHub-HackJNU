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


    const [professor, setProfessor] = useState([]);
    //  const {DisplayUniversities, setDisplayUniversities} = useState([]);
    // const [search, setSearch] = useState("");
    
    
    useEffect(() => {
        async function GetUniversity() {
            try {
                const storedAdmin = JSON.parse(localStorage.getItem("admin"));
                const response = await fetch(`${GetSingleUniversityRoute}/${storedAdmin.universityId}`, {
                    method: "GET",

                  });
                  if (!response.ok) {
                    throw new Error(`API request failed with status: ${response.status}`);
                  }
                  

                const data = await response.json();
                console.log("API Response:", data);
                setProfessor(data.university.professors);
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
                            {/* {university &&

                                <ProfessorCard

                                    professor={professor}

                                />

                            } */}
                             {professor.length >= 0 ? (
                        <>
                            {professor.map((professor, ind) => (
                                <ProfessorCard key={ind} professor={professor} />
                            ))}
                        </>
                    ) : (
                        <>
                            <p className="text-center">Nothing to show....</p>
                        </>
                    )}
                        </div>
                    </main>

                    {/* Your dashboard content */}
                </AdminLayout>
            )}


            {/* <Footer /> */}
        </>
    );
}





