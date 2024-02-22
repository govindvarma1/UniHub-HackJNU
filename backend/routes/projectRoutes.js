import express from "express"
import {auth} from "../middleware/auth.js"
import { getSingleProject, listOfProjects, uploadProject } from "../controllers/projectController.js"


const router = express.Router()

router.post("/new-project",auth,uploadProject)
router.get("/feed",listOfProjects)

export default router