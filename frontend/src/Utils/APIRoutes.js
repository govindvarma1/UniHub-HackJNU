const API_ROUTE = "http://localhost:5000";

//Student Routes
export const StudentLoginRoute = `${API_ROUTE}/api/student/login`;
export const StudentRegister = `${API_ROUTE}/api/student/register`;
export const StudentPendingProjects = `${API_ROUTE}/api/student/register`;

//Verify Token Route
export const StudentTokenVerifyRoute = `${API_ROUTE}/api/auth/verify-token`;


//Professor Routes
export const ProfessorLogin = `${API_ROUTE}/api/professor/login`;
export const ProfessorRegister = `${API_ROUTE}/api/professor/register`;

//Project Routes
export const CreateProjectRoute = `${API_ROUTE}/api/project/new-project`;

//Universities Routes
export const GetUniversitiesRoute = `${API_ROUTE}/api/university/get-universities`;

//Project Feed Routes
export const ProjectFeedRoute = `${API_ROUTE}/api/project/feed`;

//Project Details Route
export const ProjectDetailsRoute = `${API_ROUTE}/api/project/`;

//Admin Routes
export const AdminRegisterRoute = `${API_ROUTE}/api/admin/register`;
export const AdminLoginRoute = `${API_ROUTE}/api/admin/login`;

//Verify Token Route For Admin
export const AdminTokenVerifyRoute = `${API_ROUTE}/api/auth/verify-token`;

//Adding Professors
export const AddProfessorRoute = `${API_ROUTE}/api/admin/add-professor`;

export const GetPendingProjects = `${API_ROUTE}/api/professor/all-pending-projects`

//Single University
export const GetSingleUniversityRoute =`${API_ROUTE}/api/university/get-university`
