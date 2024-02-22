import React, { useEffect, useState } from "react";
import { GetApprovedProjects, GetPendingProjects } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfessorDashboard() {
    const [pendingProjects, setPendingProjects] = useState([]);
    const [approvedProjects, setApprovedProjects] = useState([]);
    const [selectedOption, setSelectedOption] = useState("pending");
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
                console.log(pendingData);
                setApprovedProjects(approvedData);
            } catch (error) {
                console.error(error);
                toast.error("Error fetching projects");
            }
        }

        fetchData();
    }, [navigate]);


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const displayedProjects = selectedOption === "pending" ? pendingProjects : approvedProjects;

    return (
        <div className="container p-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold">Welcome to Professor Dashboard</h1>

            <div className="mb-4">
                <label className="mr-4">Select Projects:</label>
                <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                    <option value="pending">Pending Projects</option>
                    <option value="approved">Approved Projects</option>
                </select>
            </div>

            <main className="mt-8">
                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">
                        {selectedOption === "pending" ? "Pending Projects" : "Approved Projects"}
                    </h2>
                    <ul>
                        {displayedProjects.map((project, ind) => (
                            <li key={ind} className="flex items-center justify-between mb-2">
                                <span>{project.title} - {project.author.username}</span>
                                <button
                                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                                    onClick={() => navigate(`/professor/project/review/${project._id}`)}
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <ToastContainer />
        </div>
    );
}
