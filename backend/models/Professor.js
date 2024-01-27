import mongoose from "mongoose";

const ProfessorSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        university:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "University",
            required:true
        },
        bio:String
    }
)

const Professor=mongoose.model("Professor",ProfessorSchema)
export default Professor