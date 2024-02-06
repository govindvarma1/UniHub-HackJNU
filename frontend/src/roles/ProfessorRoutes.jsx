import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfessorDashBoard from "../Pages/ProfessorDashBoard";
import ProfessorLogin from "../Components/Auth/ProfessorLogin";
import { ProfessorAuthProvider } from "../Context/ProfessorAuthContext";

const ProfessorRoutes = () => {
    return (
        <ProfessorAuthProvider>
            <Routes>
                <Route path="/dashboard" element={<ProfessorDashBoard />} />
                <Route path="/login" element={<ProfessorLogin />} />
            </Routes>
        </ProfessorAuthProvider>
    );
};

export default ProfessorRoutes;
