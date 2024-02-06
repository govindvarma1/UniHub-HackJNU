// AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from '../Context/AdminAuthContext';
import AdminLogin from '../Admin/AdminLogin';
import AdminRegistrationForm from '../Admin/AdminRegister';
import Admin from '../Admin/Admin';
import AddProfessor from '../Admin/AddProfessor';
import ProfessorList from '../Admin/ProfessorList';
import ProjectList from '../Admin/ProjectsList';

const AdminRoutes = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Admin login */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegistrationForm />} />
        {/* Admin Dashboard */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-professor" element={<AddProfessor />} />
        <Route path="/professor-list" element={<ProfessorList />} />
        <Route path="/projects" element={<ProjectList />} />
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminRoutes;
