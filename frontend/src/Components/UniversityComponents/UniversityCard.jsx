import React from "react";
import { useNavigate } from "react-router-dom";

export default function University({ university }) {
    const { _id, name, description } = university;
    const navigate = useNavigate();

    return (
        <div
            key={_id}
            onClick={() => {
                navigate(`/universities/${_id}`);
            }}
            className="p-6 rounded-md shadow-md cursor-pointer">
            <h1 className="mb-2 text-xl font-semibold">{name}</h1>
            <p>{description}</p>
        </div>
    );
}
