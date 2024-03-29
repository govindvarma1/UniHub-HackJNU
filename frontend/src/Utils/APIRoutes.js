const API_ROUTE = "http://localhost:5000";

{
    /* Protected Routes */
}
//Student Routes
export const StudentLoginRoute = `${API_ROUTE}/api/student/login`; //Student Login
export const StudentRegister = `${API_ROUTE}/api/student/register`; //Student Register
export const StudentPendingProjects = `${API_ROUTE}/api/student/`; //Student Pending Project
export const StudentTokenVerifyRoute = `${API_ROUTE}/api/student/verify-token`; //Student Token Verify

//Professor Routes
export const ProfessorTokenVerifyRoute = `${API_ROUTE}/api/professor/verify-token`; //Student Token Verify
export const ProfessorLoginRoute = `${API_ROUTE}/api/professor/login`;
export const ProfessorRegister = `${API_ROUTE}/api/professor/register`;
export const GetPendingProjects = `${API_ROUTE}/api/professor/all-pending-projects`;
export const GetApprovedProjects = `${API_ROUTE}/api/professor/all-approved-projects`;
export const GetSinglePendingProject = `${API_ROUTE}/api/professor/single-pending-project`;
export const ProfessorProjectReview = `${API_ROUTE}/api/professor/review-project`;

//Admin Routes
export const AdminTokenVerifyRoute = `${API_ROUTE}/api/admin/verify-token`; //Student Token Verify
export const AdminRegisterRoute = `${API_ROUTE}/api/admin/register`;
export const AdminLoginRoute = `${API_ROUTE}/api/admin/login`;
export const AddProfessorRoute = `${API_ROUTE}/api/admin/add-professor`;

//Project Routes
export const ProjectDetailsRoute = `${API_ROUTE}/api/project/`;
export const CreateProjectRoute = `${API_ROUTE}/api/project/new-project`;

{
    /* Unprotected Routes */
}
export const GetSingleUniversityRoute = `${API_ROUTE}/api/university/get-university`;
export const ProjectFeedRoute = `${API_ROUTE}/api/project/feed`;
export const GetUniversitiesRoute = `${API_ROUTE}/api/university/get-universities`;
