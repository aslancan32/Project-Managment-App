import express from "express";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import sectionController from "../controllers/Section.js";
import { SectionUpdateValiation, SectionValiation} from "../validations/Sections.js";

const router = express.Router()

router.get("/",authenticateToken, sectionController.index)
router.route("/").post(authenticateToken,validate(SectionValiation), sectionController.create)
router.route("/:sectionId").patch(authenticateToken,validate(SectionUpdateValiation), sectionController.update)
router.route("/:sectionId").delete(authenticateToken, sectionController.deleteSection)

export default router
