import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetSingleUniversityRoute } from "../../Utils/APIRoutes";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import ProjectCard from "../ProjectComponents/ProjectCard";

const UniversityPage = () => {
    const { universityId } = useParams();
    const [university, setUniversity] = useState(null);

    useEffect(() => {
        const fetchUniversityData = async () => {
            try {
                const response = await fetch(
                    `${GetSingleUniversityRoute}/${universityId}`
                );
                const data = await response.json();
                setUniversity(data.university);
            } catch (error) {
                console.error("Error fetching university data:", error);
            }
        };

        fetchUniversityData();
    }, [universityId]);

    return (
        <>
            <Header />
            <div className="container p-4 mx-auto mt-16">
                {university ? (
                    <>
                        <h1 className="mb-4 text-3xl font-bold">
                            {university.name}
                        </h1>
                        <p className="mb-8">{university.description}</p>

                        <div className="mt-4">
                            <h2 className="mb-2 text-2xl font-bold">
                                Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {university.projects.map((project) => (
                                    <ProjectCard project={project} />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UniversityPage;
