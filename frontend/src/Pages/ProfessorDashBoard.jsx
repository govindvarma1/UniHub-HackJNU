import React, { useEffect, useState } from "react";
import { GetApprovedProjects, GetPendingProjects } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfessorDashboard() {
    const [pendingProjects, setPendingProjects] = useState([]);
    const [approvedProjects, setApprovedProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const professor = JSON.parse(localStorage.getItem("professor"));
            if (!professor || !professor.token) {
                console.log("Please Login");
                navigate("/professor/login");
                return;
            }

            const FETCH_OPTIONS = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${professor.token}`,
                },
            };

            async function fetchProjects(url) {
                try {
                    const response = await fetch(url, FETCH_OPTIONS);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error(error);
                    return [];
                }
            }

            async function fetchPendingProjects() {
                return fetchProjects(GetPendingProjects);
            }

            async function fetchApprovedProjects() {
                return fetchProjects(GetApprovedProjects);
            }

            try {
                const pendingData = await fetchPendingProjects();
                const approvedData = await fetchApprovedProjects();

                setPendingProjects(pendingData);
                setApprovedProjects(approvedData);
            } catch (error) {
                console.error(error);
                toast.error("Error fetching projects");
            }
        }

        fetchData();
    }, [navigate]);

    return (
        <div>
            Welcome to Professor Dashboard
            <main className="mt-16">
                DashBoard
            </main>
            <ToastContainer />
        </div>
    );
}
