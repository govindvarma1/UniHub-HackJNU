import Project from "../models/Project.js";
import Student from "../models/Student.js";
import Readme from "../models/Readme.js";
import University from "../models/University.js";
import fetch from "node-fetch";

export const uploadProject = async (req, res, next) => {
    try {
        const { title, description, techStack, methodology } = req.body;

        const studentId = req.user.user_id;

        // Validate the input (add more validation as needed)
        if (!title || !description || !techStack) {
            return res
                .status(400)
                .json({
                    error: "Title, description, and techStack are required.",
                });
        }

        // Check if the provided studentId exists in the database
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: "Student not found." });
        }

        // Create the readme for the project
        const newReadme = await Readme.create({
            title,
            description,
            techStack,
            methodology,
        });

        // Create the project with a "pending" status and associate it with the newly created readme
        const newProject = await Project.create({
            title,
            readmeFile: newReadme._id,
            author: studentId,
            status: "pending",
        });

        // Update the student with the new project
        student.projects.push(newProject._id);
        await student.save();

        const universityId = student.university;
        const university = await University.findById(universityId);

        if (university) {
            university.projects.push(newProject._id);
            await university.save();
        }

        const getPlagiarismScore = async (newReadme, newProject) => {
            try {
                const newReadmeBody = newReadme;
                const plagiarismScoreResponse = await fetch(
                    `${process.env.PLAG_URL}/process_json`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(newReadmeBody),
                    }
                );
                const plagiarismScoreData = await plagiarismScoreResponse.json();
        
                if (plagiarismScoreData.score == 0) {
                    newProject.score = 0;
                    await newProject.save();
                }
        
                if (plagiarismScoreData.length > 0) {
                    newProject.score = plagiarismScoreData[0].score;
                    newProject.plagiarismResults = plagiarismScoreData;
                    await newProject.save();
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        await getPlagiarismScore(newReadme, newProject);
        
        res.status(200).json({ project: newProject, readme: newReadme });
    } catch (ex) {
        next(ex);
    }
};

export const listOfProjects = async (req, res, next) => {
    try {
        // Retrieve the recently approved 20 projects with populated readmeFile, author, and university details
        const recentlyApprovedProjects = await Project.find({
            status: "approved",
        })
            .sort({ _id: -1 })
            .populate({
                path: "readmeFile",
            })
            .populate({
                path: "author",
                model: "Student",
                select: "username university", // Include username and university of the author
                populate: {
                    path: "university",
                    model: "University",
                    select: "name description", // Include name and description of the university
                },
            })
            .populate("approvedBy");

        res.status(200).json({ recentlyApprovedProjects });
    } catch (ex) {
        next(ex);
    }
};

export const getSingleProject = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        // Find the project by ID and populate the related entities
        const project = await Project.findById(projectId)
            .populate("readmeFile")
            .populate("approvedBy")
            .populate("author", "username gradYear bio"); // Include necessary fields from Student model
        // .populate('approvedBy', 'username'); // Assuming Professor model has 'username' field

        if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }

        // Check if the project is approved
        if (project.status !== "approved") {
            return res.status(403).json({ error: "Project is not approved." });
        }

        res.status(200).json({ project });
    } catch (ex) {
        next(ex);
    }
};

