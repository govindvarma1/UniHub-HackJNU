import express from "express";
import { auth } from "../middleware/auth.js";
import {
    AdminLogin,
    addProfessor,
    adminRegister,
    verifyToken,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/verify-token", auth, verifyToken);
router.post("/register", adminRegister);
router.post("/login", AdminLogin);
router.post("/add-professor", auth, addProfessor);

export default router;
