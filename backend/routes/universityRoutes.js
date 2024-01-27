import express from "express"
import { getAllUniversities, getSingleUniversity } from "../controllers/universityController.js"


const router = express.Router()

router.get("/get-universities", getAllUniversities)
router.get("/get-university/:universityId", getSingleUniversity)

export default router