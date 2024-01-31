import express from "express";
import { auth } from "../middleware/auth.js";
import {
    StudentLogin,
    StudentRegister,
    allProjectsOfUniversity,
    getApprovedProjects,
    getPendingProjects,
    getRejectedProjects,
    getStudentInfo,
    verifyToken,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/register", StudentRegister);
router.post("/login", StudentLogin);
router.post("/verify-token", auth, verifyToken);
router.get("/all-pending-projects", auth, getPendingProjects);
router.get("/all-approved-projects", auth, getApprovedProjects);
router.get("/all-rejected-projects", auth, getRejectedProjects);
router.get("/projects-in-university", auth, allProjectsOfUniversity);
router.get("/:studentId", getStudentInfo);

export default router;
