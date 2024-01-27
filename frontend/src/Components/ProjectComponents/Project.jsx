// ProjectPage.js
import React, { useState, useEffect } from "react";
import { ProjectDetailsRoute } from "../../Utils/APIRoutes";
import { Link, useParams } from "react-router-dom";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

const ProjectPage = ({ match }) => {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${ProjectDetailsRoute}${projectId}`
                ); // Replace with your API endpoint

                if (!response.ok) {
                    throw new Error(
                        `Error: ${response.status} - ${response.statusText}`
                    );
                }

                const data = await response.json();
                setProject(data.project);
            } catch (error) {
                console.error("Error fetching project:", error.message);
            }
        };

        fetchData();
    }, []);

    if (!project) {
        return (
            <div className="container mx-auto mt-8 text-center">Loading...</div>
        );
    }
    return (
        <>
            <Header />

            <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold mb-4 text-blue-800">
                    {project.title}
                </h1>
                <p className="text-gray-600 mb-4">
                    {project.readmeFile.description}
                </p>
                <div className="mb-4">
                    <strong className="text-gray-800">Tech Stack:</strong>{" "}
                    {project.readmeFile.techStack.join(", ")}
                </div>
                <div className="mb-4">
                    <strong className="text-gray-800">Methodology:</strong>{" "}
                    {project.readmeFile.methodology}
                </div>
                <div className="mb-4">
                    <strong className="text-gray-800">Author:</strong>{" "}
                    <Link
                        to={`/students/${project.author._id}`}
                        className="text-blue-600 hover:underline">
                        {project.author.username}
                    </Link>{" "}
                    (Grad Year: {project.author.gradYear})
                </div>
                <div className="mb-4">
                    <strong className="text-gray-800">Status:</strong>{" "}
                    {project.status}
                </div>
                <div className="mb-4">
                    <strong className="text-gray-800">Project ID:</strong>{" "}
                    {project._id}
                </div>
                {/* Add other fields as needed */}
            </div>
            <Footer />
        </>
    );
};

export default ProjectPage;
