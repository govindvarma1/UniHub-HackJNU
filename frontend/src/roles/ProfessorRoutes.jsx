import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfessorDashBoard from '../Pages/ProfessorDashBoard';
import ProfessorLogin from '../Components/Auth/ProfessorLogin';

const ProfessorRoutes = () => {
  return (
    <Routes>
      {/* Proffesor dashboad */}
      <Route path="/professor/dashboard" element={<ProfessorDashBoard />} />
      <Route path="/professor/login" element={<ProfessorLogin />} />
    </Routes>
  );
};

export default ProfessorRoutes;
