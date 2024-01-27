import express from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import Admin from "../models/Admin.js"
import University from '../models/University.js'
import { auth } from "../middleware/auth.js"
import { addProfessor } from "../controllers/adminController.js"

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const { username, password, universityName, universityDescription } = req.body;

        // Validate the input (add more validation as needed)
        if (!username || !password || !universityName) {
            return res.status(400).json({ error: 'Username, password, and university name are required.' });
        }

        const foundUser = await Admin.findOne({username: username})
        if(foundUser) {
            return res.status(400).send({error: "Username already exists"})
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the admin
        const admin = await Admin.create({
            username,
            password: hashedPassword
        });

        const foundUniversity = await University.findOne({name: universityName});

        if(foundUniversity) {
            res.status(400).send({error: "University Already Exists"})
        }

        // Create the university associated with the admin
        const university = await University.create({
            name: universityName,
            description: universityDescription,
            admin: admin._id // Assign the created admin as the university admin
        });

        // Update the admin with the created university
        admin.university = university._id;
        await admin.save();

        const token = jwt.sign({ user_id: admin._id }, process.env.JWT_SECRET);

        res.status(200).json({ token, user_id: admin._id, universityId: admin.university });
    } catch (ex) {
        next(ex);
    }
})
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate the input (add more validation as needed)
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // Check if the admin exists
        if (!admin) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // If the username and password are valid,generate and return a token here
        const token = jwt.sign({ user_id: admin._id }, process.env.JWT_SECRET);

        return res.status(200).json({ token, user_id: admin._id, universityId: admin.university })
    } catch (ex) {
        next(ex);
    }
}
)

router.post("/add-professor",auth,addProfessor)
export default router