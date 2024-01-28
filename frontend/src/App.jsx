import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AuthProvider } from './Context/AuthContext'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Home from './Pages/Home'
import CreateProject from './Pages/CreateProject'

import Universities from './Pages/Universities'
import Projects from './Pages/Projects'
import UniversityPage from './Components/UniversityComponents/UniversityPage'
import ProjectPage from "./Components/ProjectComponents/Project"
import Profile from './Pages/Profile'

import AdminLogin from './Admin/AdminLogin'
import AdminRegistrationForm from "./Admin/AdminRegister"
import { AdminAuthProvider } from './Context/AdminAuthContext'
import Admin from "./Admin/Admin"
import AddProfessor from './Admin/AddProfessor'
import ProfessorList from './Admin/ProfessorList'
<<<<<<< Updated upstream
import ProjectList from "./Admin/ProjectsList"
=======
import ProfessorDashBoard from './Pages/ProfessorDashBoard'
import { ProfessorLogin } from './Utils/APIRoutes'
>>>>>>> Stashed changes

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <AdminAuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/profile" element={<Profile />} />

              {/* Individual Pages */}
              <Route path="/universities/:universityId" element={<UniversityPage />} />
              <Route path="/project/:projectId" element={<ProjectPage />} />

              {/*Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin login              */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={< AdminRegistrationForm />} />

              {/* Admin Dashboard */}
              <Route path="/admin" element={< Admin />} />
              <Route path="/admin/add-professor" element={< AddProfessor />} />
              <Route path="/admin/professor-list" element={< ProfessorList />} />
              <Route path="/admin/projects" element={< ProjectList />} />

              {/* Proffesor dashboad */}
              <Route path="/professor/dashboard" element={<ProfessorDashBoard />} />
              <Route path="/professor/login" element={<ProfessorLogin />} />


            </Routes>
          </AdminAuthProvider>

        </AuthProvider>

      </BrowserRouter>




    </>


  )
}

export default App
