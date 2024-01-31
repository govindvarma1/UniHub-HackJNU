import express from "express";
import { auth } from "../middleware/auth.js";
import {
    changePassword,
    getAllApprovedProjects,
    getAllPendingProjects,
    professorLogin,
    reviewProject,
    verifyToken,
} from "../controllers/professorController.js";

const router = express.Router();

router.post("/login", professorLogin);
router.post("/verify-token", auth, verifyToken);
router.post("/review-project/:projectId", auth, reviewProject);
router.post("/change-password", auth, changePassword);
router.get("/all-pending-projects", auth, getAllPendingProjects);
router.get("/all-approved-projects", auth, getAllApprovedProjects);

export default router;
