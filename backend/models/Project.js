import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        readmeFile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Readme"
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        approvedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professor"
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        score:{
            type:Number
        },
        plagiarismResults: [{
            _id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Readme"
            },
            heading: {
                type: String
            },
            plagiarised_text: {
                type: String
            },
            score: {
                type: Number
            },
            similar_text: {
                type: String
            },
        }]
    }
)

const Project = mongoose.model("Project", ProjectSchema)
export default Project