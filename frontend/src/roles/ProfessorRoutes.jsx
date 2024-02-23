import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfessorDashBoard from "../Pages/ProfessorDashBoard";
import ProfessorLogin from "../Components/Auth/ProfessorLogin";
import { ProfessorAuthProvider } from "../Context/ProfessorAuthContext";
import ProjectReview from "../Pages/ProjectReview";

const ProfessorRoutes = () => {
    return (
        <ProfessorAuthProvider>
            <Routes>
                <Route path="/dashboard" element={<ProfessorDashBoard />} />
                <Route path="/login" element={<ProfessorLogin />} />
                <Route path="/project/review/:projectId" element ={<ProjectReview />} />
            </Routes>
        </ProfessorAuthProvider>
    );
};

export default ProfessorRoutes;
