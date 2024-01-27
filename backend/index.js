//importing required libraries
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import universityRoutes from './routes/universityRoutes.js'
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import universityRoutes from "./routes/universityRoutes.js"
import { auth } from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cors());

//FILE_UPLOADS
app.use("/file_uploads", express.static("file_uploads"));
//ROUTES

app.use("/api/auth",authRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/university", universityRoutes);

//MONGOOSE SETUP
async function DBConnect(req, res) {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database succesfully");
    } catch (err) {
        console.error(`The following error occured: ${err}`);
    }
}
DBConnect();

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
});

export default app;
