import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        gradYear: {
            type: String,
            required: true,
        },
        bio: String,
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        university:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "University",
            required:true
        }
    }
)

const Student = mongoose.model("Student", StudentSchema)
export default Student