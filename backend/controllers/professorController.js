import Project from "../models/Project.js";
import Professor from "../models/Professor.js"
import University from "../models/University.js";
import bcrypt from "bcrypt"
import Readme from "../models/Readme.js";
import axios from "axios"
export const getAllPendingProjects=async (req, res, next) => {
    try {
        const professorId = req.user.user_id;

        // Check if the provided professorId exists in the database
        const professor = await Professor.findById(professorId);

        if (!professor) {
            return res.status(404).json({ error: 'Professor not found.' });
        }

        // Retrieve the university ID from the professor document
        const universityId = professor.university;

        const university = await University.findById(universityId);

        if (!university) {
            return res.status(404).json({ error: 'University not found.' });
        }
        // Retrieve all pending projects for the university
        const pendingProjects = await Project.find({
            _id: { $in: university.projects },
            status: 'pending'
        });

        res.status(200).json(pendingProjects);
    } catch (ex) {
        next(ex);
    }
}


export const getAllApprovedProjects=async (req, res, next) => {
    try {
        const professorId = req.user.user_id;

        // Check if the provided professorId exists in the database
        const professor = await Professor.findById(professorId);

        if (!professor) {
            return res.status(404).json({ error: 'Professor not found.' });
        }

        // Retrieve the university ID from the professor document
        const universityId = professor.university;

        const university = await University.findById(universityId);

        if (!university) {
            return res.status(404).json({ error: 'University not found.' });
        }
        // Retrieve all approved projects for the university
        const approvedProjects = await Project.find({
            _id: { $in: university.projects },
            status: 'approved'
        });

        res.status(200).json(approvedProjects);
    } catch (ex) {
        next(ex);
    }
}

export const reviewProject=async(req,res,next)=>{
    try {

        const professorId = req.user.user_id;
        const projectId = req.params.projectId; // Assuming the project ID is part of the route parameters

        const { decision } = req.body; // Decision can be 'approved' or 'rejected'

        // Check if the provided professorId exists in the database
        const professor = await Professor.findById(professorId);

        if (!professor) {
            return res.status(404).json({ error: 'Professor not found.' });
        }

        // Check if the provided projectId exists in the database
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        const projectReadme=await Readme.findById(project.readmeFile)
        
        // Update the project status based on the decision
        if (decision === 'approved' || decision === 'rejected') {
            project.status = decision;
            project.approvedBy=professorId;
            await project.save();

            if(decision==="approved"){
                const updateDatabase = async (projectReadme) => {
                    try {
                        const projectReadmeBody = projectReadme
                        const response = await axios.post('https://7e4e-34-106-121-214.ngrok-free.app/update_json',
                            projectReadmeBody,
                            {
                                "Content-Type": "application/json"
                            }
                        )
                        console.log(response.data)
                    } catch (error) {
                        console.log(error)
                    }
                }
                await updateDatabase(projectReadme)
            }

            res.status(200).json({ message: `Project ${decision} successfully.` });
        } else {
            res.status(400).json({ error: 'Invalid decision. Decision must be "approved" or "rejected".' });
        }
    } catch (ex) {
        next(ex);
    }
}

export const changePassword=async(req,res,next)=>{
    try {
        const professorId = req.user.user_id; // Extract professorId from authenticated token
        const { currentPassword, newPassword } = req.body;

        // Find the professor by ID
        const professor = await Professor.findById(professorId);

        // Check if the professor exists
        if (!professor) {
            return res.status(404).json({ error: 'Professor not found.' });
        }

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, professor.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect current password.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update the professor's password
        professor.password = hashedNewPassword;
        await professor.save();

        res.status(200).json({ message: 'Password changed successfully.' });
    } catch (ex) {
        next(ex);
    }
}