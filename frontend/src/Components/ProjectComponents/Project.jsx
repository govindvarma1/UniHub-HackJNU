// ProjectPage.js
import React, { useState, useEffect } from 'react';

const ProjectPage = ({ match }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = match.params.projectId;
        const response = await fetch(`/api/projects/${projectId}`); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error('Error fetching project:', error.message);
      }
    };

    fetchData();
  }, [match.params.projectId]);

  if (!project) {
    return <div className="container mx-auto mt-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-600 mb-4">{project.readmeFile.description}</p>
      <div className="mb-4">
        <strong className="text-gray-800">Tech Stack:</strong> {project.readmeFile.techStack.join(', ')}
      </div>
      <div className="mb-4">
        <strong className="text-gray-800">Methodology:</strong> {project.readmeFile.methodology}
      </div>
      <div className="mb-4">
        <strong className="text-gray-800">Author:</strong> {project.author.username} (Grad Year: {project.author.gradYear})
      </div>
      <div className="mb-4">
        <strong className="text-gray-800">Status:</strong> {project.status}
      </div>
      <div className="mb-4">
        <strong className="text-gray-800">Project ID:</strong> {project._id}
      </div>
    </div>
  );
};

export default ProjectPage;

