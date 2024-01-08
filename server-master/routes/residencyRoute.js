import express from "express"
import { createResidency, getAllResidencies, deleteResidency, getResidency, updateResidency } from "../controllers/resdCntrl.js"
const router = express.Router()

router.post("/create", createResidency)
router.get("/allresd", getAllResidencies)
router.get("/:id", getResidency)
router.delete('/delete/:id', deleteResidency);
router.put('/update/:id', updateResidency); 

export {router as residencyRoute}
