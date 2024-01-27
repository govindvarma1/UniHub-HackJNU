import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(undefined);

    useEffect(() => {
        async function FetchProject() {
            try {
                const response = await fetch();
                const data = await response.json();
                setProject(proc);
            } catch (error) {}
        }
        FetchProject();
    }, []);

    return (
        <div>
            {projectId}
            {project && (
                <>
                    <h1>{project.title}</h1>
                    <p>Description: {project.readmeFile.description}</p>
                    <p>Methodology: {project.readmeFile.methodology}</p>
                    <p>Tech Stack: {project.readmeFile.techStack.join(", ")}</p>
                    <p>Status: {project.status}</p>
                    <p>Author: {project.author.username}</p>
                    <p>University: {project.author.university.name}</p>
                </>
            )}
        </div>
    );
};

export default ProjectPage;
