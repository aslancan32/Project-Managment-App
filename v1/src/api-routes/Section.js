import express from "express";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import { create,deleteSection,index, update } from "../controllers/Section.js";
import { SectionUpdateValiation, SectionValiation} from "../validations/Sections.js";

const router = express.Router()

router.get("/",authenticateToken, index)
router.route("/").post(authenticateToken,validate(SectionValiation), create)
router.route("/:sectionId").patch(authenticateToken,validate(SectionUpdateValiation), update)
router.route("/:sectionId").delete(authenticateToken, deleteSection)

export default router
