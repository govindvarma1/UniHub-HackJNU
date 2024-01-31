import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentRoutes from './roles/StudentRoutes';
import AdminRoutes from './roles/AdminRoutes';
import ProfessorRoutes from './roles/ProfessorRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<StudentRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/professor/*" element={<ProfessorRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;

