import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import {
    GetSinglePendingProject,
    ProfessorProjectReview,
} from "../Utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectReview = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const professor = await JSON.parse(
                    localStorage.getItem("professor")
                );
                if (!professor || !professor.token) {
                    toast.error("please login");
                    navigate("/professor/login");
                    return;
                }
                const response = await fetch(
                    `${GetSinglePendingProject}/${projectId}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${professor.token}`,
                        },
                    }
                );
                const data = await response.json();
                if (response.status !== 200) {
                    console.error(data);
                } else {
                    setProject(data.project);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleDecision = async (decision) => {
        try {
            const professor = await JSON.parse(
                localStorage.getItem("professor")
            );
            if (!professor || !professor.token) {
                toast.error("please login");
                navigate("/professor/login");
                return;
            }
            const response = await fetch(
                `${ProfessorProjectReview}/${projectId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${professor.token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ decision: decision }),
                }
            );
            if (response.status == 200) {
                toast.success("Project verified sucessfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            } else {
                console.log(await response.json());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {project !== undefined && (
                <div className="max-w-screen-xl max-h-screen p-8 mx-auto mt-8 overflow-hidden bg-white rounded-md shadow-md">
                    <h2 className="mb-4 text-2xl font-bold">{project.title}</h2>

                    {/* Flex container for sections */}
                    <div className="flex h-full">
                        {/* ReadmeFile Section (Left) */}
                        <div className="w-1/2 max-h-screen pr-4 mb-6 overflow-y-auto">
                            <div className="max-w-full">
                                <h3 className="mb-2 text-lg font-bold">
                                    Project Details:
                                </h3>
                                <p className="text-gray-600">
                                    {project.readmeFile.description}
                                </p>

                                <h3 className="mb-2 text-lg font-bold">
                                    Tech Stack:
                                </h3>
                                <div className="p-2 mb-2 bg-gray-100 rounded-md">
                                    {project.readmeFile.techStack.map(
                                        (tech, index) => (
                                            <span
                                                key={index}
                                                className="mr-2 text-gray-700">
                                                {tech}
                                            </span>
                                        )
                                    )}
                                </div>

                                <h3 className="mb-2 text-lg font-bold">
                                    Methodology:
                                </h3>
                                <p>{project.readmeFile.methodology}</p>
                            </div>
                        </div>

                        {/* Plagiarism Results Section (Right) */}
                        <div className="w-1/2 max-h-screen pl-4 mb-6 overflow-y-auto">
                            <div className="max-w-full">
                                <h3 className="mb-2 text-lg font-bold">
                                    Plagiarism Results:
                                </h3>
                                {project.plagiarismResults.length > 0 ? (
                                    <ul>
                                        {project.plagiarismResults.map(
                                            (result, index) => (
                                                <li key={index}>
                                                    <p className="text-gray-700">
                                                        {result.heading}
                                                    </p>
                                                    <p className="text-gray-500">
                                                        {result.similar_text}
                                                    </p>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p>No plagiarism results available.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Decision Buttons Section */}
                    <div className="flex justify-center gap-16 mt-4">
                        <button
                            className="px-4 py-2 text-white bg-red-500 rounded-md"
                            onClick={() => handleDecision("rejected")}
                            >
                            Reject
                        </button>
                        <button
                            className="px-4 py-2 text-white bg-green-500 rounded-md"
                            onClick={() => handleDecision("approved")}
                            >
                            Approve
                        </button>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    );
};

export default ProjectReview;
