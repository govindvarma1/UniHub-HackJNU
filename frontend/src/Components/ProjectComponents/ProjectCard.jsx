import React from 'react';
import {useNavigate} from "react-router-dom"

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/project/${project._id}`)} className="grid p-8 mb-4 bg-white rounded-md shadow-md ">
      <h2 className="mb-2 text-xl font-semibold">{project.title}</h2>

      <div className="flex items-center">
        <span className="mr-2 text-gray-600">Author:</span>
        <span className="text-blue-500">{project.author.username}</span>
      </div>
        <p className="text-md">{project.readmeFile.description}</p>
      <div className="mt-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
