import Footer from "../Components/Layouts/Footer";
import Header from "../Components/Layouts/Header";
import React, { useEffect, useState } from "react";
import { GetApprovedProjects, GetPendingProjects } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfessorDashBoard() {
    const [pendingProjects, setPendingProjects] = useState([]);
    const [approvedProjects, setApprovedProjects] = useState([]);
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     async function FetchPendingProjects() {
    //         const professor = JSON.parse(localStorage.getItem("professor")); // Parse the JSON string
    //         console.log(professor);
    //         if (!professor || !professor.token) {
    //             console.log("Please Login");
    //             navigate("/professor/login");
    //             return;
    //         }
    //         try {
    //             const response1 = await fetch(GetPendingProjects, {
    //                 method: "POST",
    //                 headers: {
    //                     Authorization: `Bearer ${professor.token}`, // Fix here: use professor.token
    //                 },
    //             });
    //             const response2 = await fetch(GetApprovedProjects, {
    //                 method: "POST",
    //                 headers: {
    //                     Authorization: `Bearer ${professor.token}`, // Fix here: use professor.token
    //                 },
    //             });
    //             const data1 = await response1.json();
    //             const data2 = await response2.json();
    //             setPendingProjects(data1);
    //             setApprovedProjects(data2);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     FetchPendingProjects();
    // }, []);

    return (
        <div>
            {/* <Header /> */}
            <main className="mt-16">
                DashBoard
            </main>
            {/* <Footer /> */}
        </div>
    );
}
