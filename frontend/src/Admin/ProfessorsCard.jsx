import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfessorCard({ professor }) {
    console.log("University Data:", professor);

    // const professor = university.professors && university.professors.length > 0
    //     ? university.professors[0]
    //     : null;

   // const { _id, name, description } = university;
    //const navigate = useNavigate();

    return (
        <div
            className="p-6 rounded-md shadow-md cursor-pointer">
            {/* <h1 className="mb-2 text-xl font-semibold">{name}</h1> */}
            <h4 className="mb-2 text-xl font-semibold">Professor:</h4>
            {professor ? (
                <div id={professor._id}>
                    <p>Name: {professor.username}</p>
                    <p>Bio: {professor.bio}</p>
                  
                </div>
            ) : (
                <p>No professor information available</p>
            )}
        </div>
    );
}
