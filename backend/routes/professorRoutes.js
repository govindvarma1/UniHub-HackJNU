import express from "express"
import Professor from "../models/Professor.js"
import University from "../models/University.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { auth } from "../middleware/auth.js"
import { changePassword, getAllApprovedProjects, getAllPendingProjects, reviewProject} from "../controllers/professorController.js"

const router = express.Router()

router.post("/login",async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate the input (add more validation as needed)
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // Find the professor by username
        const professor = await Professor.findOne({ username });

        // Check if the professor exists
        if (!professor) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, professor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // If the username and password are valid,generate and return a token here
        const token = jwt.sign({ user_id: professor._id }, process.env.JWT_SECRET);

        return res.status(200).json({ token, user_id: professor._id })
    } catch (ex) {
        next(ex);
    }
}
)

router.get("/all-pending-projects",auth,getAllPendingProjects)
router.get("/all-approved-projects",auth,getAllApprovedProjects)
router.post("/review-project/:projectId",auth,reviewProject)
router.post("/change-password",auth,changePassword)

export default router