import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetSinglePendingProject } from "../Utils/APIRoutes";

const ProjectReview = () => {
    const { projectId } = useParams();
    const [isApproved, setIsApproved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const professor = await JSON.parse(
                    localStorage.getItem("professor")
                );
                if (!professor || !professor.token) {
                    navigate("/professor/login");
                    return;
                }
                const response = await fetch(`${GetSinglePendingProject}/${projectId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${professor.token}`,
                    },
                });
                const data = await response.json();
                if (response.status !== 200) {
                    console.error(data);
                } else {
                    console.log("sucess");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleApprove = () => {
        // Implement your logic to handle project approval
        setIsApproved(true);
    };

    const handleReject = () => {
        // Implement your logic to handle project rejection
        setIsApproved(false);
    };

    return (
        <h1>{projectId}</h1>
        // <div className="max-w-2xl p-8 mx-auto mt-8 bg-white rounded-md shadow-md">
        //     <h2 className="mb-4 text-2xl font-bold">{project.title}</h2>
        //     <p className="mb-4 text-gray-600">{project.description}</p>

        //     <div className="p-4 mb-4 overflow-auto border rounded-md max-h-60">
        //         <h3 className="mb-2 text-lg font-bold">Plagiarism Results:</h3>
        //         {project.plagiarismResults.map((result, index) => (
        //             <div key={index} className="mb-2">
        //                 <p className="text-gray-700">{result.heading}</p>
        //                 <p className="text-gray-500">{result.similar_text}</p>
        //             </div>
        //         ))}
        //     </div>

        //     <div className="flex justify-between">
        //         <button
        //             className={`px-4 py-2 bg-green-500 text-white rounded-md ${
        //                 isApproved && "opacity-50 cursor-not-allowed"
        //             }`}
        //             onClick={handleApprove}
        //             disabled={isApproved}>
        //             Approve
        //         </button>
        //         <button
        //             className={`px-4 py-2 bg-red-500 text-white rounded-md ${
        //                 isApproved && "opacity-50 cursor-not-allowed"
        //             }`}
        //             onClick={handleReject}
        //             disabled={isApproved}>
        //             Reject
        //         </button>
        //     </div>
        // </div>
    );
};

export default ProjectReview;
