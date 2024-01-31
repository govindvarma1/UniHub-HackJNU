// StudentRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../Context/StudentAuthContext';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import Home from '../Pages/Home';
import CreateProject from '../Pages/CreateProject';
import Universities from '../Pages/Universities';
import Projects from '../Pages/Projects';
import UniversityPage from '../Components/UniversityComponents/UniversityPage';
import ProjectPage from '../Components/ProjectComponents/Project';
import Profile from '../Pages/Profile';

const StudentRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/profile" element={<Profile />} />
        {/* Individual Pages */}
        <Route path="/universities/:universityId" element={<UniversityPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
};

export default StudentRoutes;
