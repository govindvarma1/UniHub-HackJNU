import University from "../models/University.js"
import Professor from "../models/Professor.js"
import bcrypt from "bcrypt"

export const addProfessor=async (req, res, next) => {
    try {
        const { username, password, bio, universityId } = req.body;

        console.log(req.body);

        // Validate the input (add more validation as needed)
        if (!username || !password || !universityId) {
            return res.status(400).json({ error: 'Username, password, and universityId are required.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if the provided universityId exists
        const university = await University.findById(universityId);

        if (!university) {
            return res.status(404).json({ error: 'University not found.' });
        }

        // Create the professor
        const newProfessor = await Professor.create({
            username,
            password: hashedPassword,
            bio,
            university: universityId // Associate the professor with the specified university
        });

        // Update the university with the new professor
        university.professors.push(newProfessor._id);
        await university.save();

        res.status(200).json(newProfessor);
    } catch (ex) {
        next(ex);
    }
}