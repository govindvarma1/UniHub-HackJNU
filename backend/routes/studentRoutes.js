import express from "express"
import Student from "../models/Student.js"
import University from "../models/University.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import {auth} from "../middleware/auth.js"
import { allProjectsOfUniversity, getApprovedProjects, getPendingProjects, getRejectedProjects, getStudentInfo } from "../controllers/studentController.js"

const router = express.Router()

router.post("/register",async (req, res, next) => {
    try {
        const { username, password, bio, gradYear, universityId } = req.body;

        // Validate the input (add more validation as needed)
        if (!username || !password || !universityId) {
            return res.status(400).json({ error: 'Username, password, and universityId are required.' });
        }

        const foundUser = await Student.findOne({username: username});
        console.log(foundUser);

        if(foundUser) {
            return res.status(404).send({error: "Username is already taken"});
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if the provided universityId exists
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ error: 'University not found.' });
        }

        // Create the student
        const newStudent = await Student.create({
            username,
            password: hashedPassword,
            bio,
            gradYear: gradYear,
            university: universityId // Associate the student with the specified university
        });

        // // Update the university with the new student
        university.students.push(newStudent._id);
        await university.save();
        

        const token = jwt.sign({ user_id: newStudent._id }, process.env.JWT_SECRET);

        res.status(200).json({ token: token,user_id: newStudent._id });
    } catch (ex) {
        next(ex);
    }
})

router.post("/login",async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate the input (add more validation as needed)
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // Find the student by username
        const student = await Student.findOne({ username });

        // Check if the student exists
        if (!student) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // If the username and password are valid,generate and return a token here
        const token = jwt.sign({ user_id: student._id }, process.env.JWT_SECRET);

        return res.status(200).json({ token, user_id: student._id })
    } catch (ex) {
        next(ex);
    }
}
)

router.get("/all-pending-projects",auth,getPendingProjects)
router.get("/all-approved-projects",auth,getApprovedProjects)
router.get("/all-rejected-projects",auth,getRejectedProjects)
router.get("/projects-in-university",auth,allProjectsOfUniversity)
router.get("/:studentId",getStudentInfo)

export default router