import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true
        },
        description: String,
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professor",
            required:true
        },
        professors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professor"
        }],
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }],
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }]
    }
)

const University = mongoose.model("University", UniversitySchema)
export default University