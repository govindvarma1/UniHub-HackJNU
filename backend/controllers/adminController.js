import University from "../models/University.js";
import Professor from "../models/Professor.js";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken"

export const adminRegister = async (req, res, next) => {
    try {
        const { username, password, universityName, universityDescription } =
            req.body;

        // Validate the input (add more validation as needed)
        if (!username || !password || !universityName) {
            return res
                .status(400)
                .json({
                    error: "Username, password, and university name are required.",
                });
        }

        const foundUser = await Admin.findOne({ username: username });
        if (foundUser) {
            return res.status(400).send({ error: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the admin
        const admin = await Admin.create({
            username,
            password: hashedPassword,
        });

        const foundUniversity = await University.findOne({
            name: universityName,
        });

        if (foundUniversity) {
            res.status(400).send({ error: "University Already Exists" });
        }

        // Create the university associated with the admin
        const university = await University.create({
            name: universityName,
            description: universityDescription,
            admin: admin._id, // Assign the created admin as the university admin
        });

        // Update the admin with the created university
        admin.university = university._id;
        await admin.save();

        const token = jwt.sign({ user_id: admin._id }, process.env.JWT_SECRET);

        res.status(200).json({
            token,
            user_id: admin._id,
            universityId: admin.university,
        });
    } catch (ex) {
        next(ex);
    }
};

export const AdminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate the input (add more validation as needed)
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Username and password are required." });
        }

        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // Check if the admin exists
        if (!admin) {
            return res
                .status(401)
                .json({ error: "Invalid username or password." });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ error: "Invalid username or password." });
        }

        // If the username and password are valid,generate and return a token here
        const token = jwt.sign({ user_id: admin._id }, process.env.JWT_SECRET);

        return res
            .status(200)
            .json({
                token,
                user_id: admin._id,
                universityId: admin.university,
            });
    } catch (ex) {
        next(ex);
    }
};

export const verifyToken = async (req, res, next) => {
    try {
        const adminId = req.user.user_id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Professor not found." });
        }
        res.send(200).send("ok");
    } catch (ex) {
        next(ex);
    }
};

export const addProfessor = async (req, res, next) => {
    try {
        const { username, password, bio, universityId } = req.body;

        console.log(req.body);

        // Validate the input (add more validation as needed)
        if (!username || !password || !universityId) {
            return res
                .status(400)
                .json({
                    error: "Username, password, and universityId are required.",
                });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if the provided universityId exists
        const university = await University.findById(universityId);

        if (!university) {
            return res.status(404).json({ error: "University not found." });
        }

        // Create the professor
        const newProfessor = await Professor.create({
            username,
            password: hashedPassword,
            bio,
            university: universityId, // Associate the professor with the specified university
        });

        // Update the university with the new professor
        university.professors.push(newProfessor._id);
        await university.save();

        res.status(200).json(newProfessor);
    } catch (ex) {
        next(ex);
    }
};
