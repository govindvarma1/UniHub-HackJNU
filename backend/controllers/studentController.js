import Project from "../models/Project.js"
import Student from "../models/Student.js"
import University from "../models/University.js"

export const getPendingProjects = async (req, res, next) => {
    try {
        // Assuming you have an authentication middleware that sets the studentId in the request object
        const studentId = req.user.user_id;

        // Check if the provided studentId exists in the database
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // Retrieve all pending projects for the student
        const pendingProjects = await Project.find({
            author: studentId,
            status: 'pending'
        });

        res.status(200).json(pendingProjects);
    } catch (ex) {
        next(ex);
    }
}

export const getApprovedProjects = async (req, res, next) => {
    try {
        // Assuming you have an authentication middleware that sets the studentId in the request object
        const studentId = req.user.user_id;

        // Check if the provided studentId exists in the database
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // Retrieve all approved projects for the student
        const approvedProjects = await Project.find({
            author: studentId,
            status: 'approved'
        });

        res.status(200).json(approvedProjects);
    } catch (ex) {
        next(ex);
    }
}

export const getRejectedProjects = async (req, res, next) => {
    try {
        // Assuming you have an authentication middleware that sets the studentId in the request object
        const studentId = req.user.user_id;

        // Check if the provided studentId exists in the database
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // Retrieve all rejected projects for the student
        const rejectedProjects = await Project.find({
            author: studentId,
            status: 'rejected'
        });

        res.status(200).json(rejectedProjects);
    } catch (ex) {
        next(ex);
    }
}

export const allProjectsOfUniversity = async (req, res, next) => {
    try {
        const studentId = req.user.user_id;

        // Check if the provided studentId exists in the database
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // Retrieve the student's university
        const universityId = student.university;

        // Retrieve the student's university with the populated pending projects, author, and readme details
        const university = await University.findById(universityId).populate({
            path: 'projects',
            match: { status: 'approved' }, // Include only approved projects
            populate: {
                path: 'author readmeFile',
                models: { path: 'author', model: 'Student' },
                select: 'username description' // Include username and description of the author
            }
        });

        if (!university) {
            return res.status(404).json({ error: 'University not found.' });
        }

        // Access the populated projects directly
        const projects = university.projects;

        res.status(200).json({ projects });
    } catch (ex) {
        next(ex);
    }
}

export const getStudentInfo = async (req, res, next) => {
    try {
        const { studentId } = req.params; // Assuming you have user information in the request

        // Find the student by ID and populate the related entities
        const student = await Student.findById(studentId)
            .populate({
                path: 'projects',
                match: { status: 'approved' }, // Only include approved projects
                populate: {
                    path: 'readmeFile', // Adjust the path based on your project structure
                },
            })
            .populate('university');

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        res.status(200).json({ student });
    } catch (ex) {
        next(ex);
    }
}