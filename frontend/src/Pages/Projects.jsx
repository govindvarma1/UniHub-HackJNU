import React, { useEffect, useState } from "react";
import Header from "../Components/Layouts/Header";
import Footer from "../Components/Layouts/Footer";
import { useNavigate } from "react-router-dom";
import { ProjectFeedRoute } from "../Utils/APIRoutes";
import ProjectCard from "../Components/ProjectComponents/ProjectCard";

export default function Projects() {
    const [feed, setFeed] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function FetchFeed() {
            try {
                const response = await fetch(ProjectFeedRoute, {
                    method: "GET",
                });
                const data = await response.json();
                setFeed(data.recentlyApprovedProjects);
            } catch (error) {
                console.log(error);
            }
        }
        FetchFeed();
    }, []);

    return (
        <>
            <Header />
            <main className="mt-16">
            <div className="grid-cols-1 gap-4 mx-16 mt-16 md:grid-cols-2 lg:grid-cols-3">
                    {feed.length >= 0 ? (
                        <>
                            {feed.map((project, ind) => (
                                <ProjectCard key={ind} project={project} />
                            ))}
                        </>
                    ) : (
                        <>
                            <p className="text-center">Nothing to show....</p>
                        </>
                    )}
                </div>                
            </main>
            <Footer />
        </>
    );
}
