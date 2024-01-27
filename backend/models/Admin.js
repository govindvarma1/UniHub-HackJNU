import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
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
        university:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "University"
        },
        bio: String,
        faculty: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professor"
        }],
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }]
    }
)

const Admin = mongoose.model("Admin", AdminSchema)
export default Admin