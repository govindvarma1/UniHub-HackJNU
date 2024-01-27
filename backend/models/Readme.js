import mongoose from "mongoose";

const ReadmeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        techStack: [{
            type: String,
            required: true
        }],
        methodology: {
            type: String,
            required: true
        }
    }
)

const Readme = mongoose.model("Readme", ReadmeSchema)
export default Readme