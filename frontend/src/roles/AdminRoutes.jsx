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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegistrationForm />} />
        {/* Admin Dashboard */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-professor" element={<AddProfessor />} />
        <Route path="/admin/professor-list" element={<ProfessorList />} />
        <Route path="/admin/projects" element={<ProjectList />} />
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminRoutes;
