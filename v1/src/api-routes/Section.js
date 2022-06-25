import express from "express";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import sectionController from "../controllers/Section.js";
import { SectionUpdateValiation, SectionValiation} from "../validations/Sections.js";
import idChecker from "../middlewares/idChecker.js";

const router = express.Router()

router.get("/",authenticateToken, sectionController.index)
router.route("/").post(authenticateToken,validate(SectionValiation), sectionController.create)
router.route("/:sectionId").patch(idChecker("sectionId"),authenticateToken,validate(SectionUpdateValiation), sectionController.update)
router.route("/:sectionId").delete(idChecker("sectionId"),authenticateToken, sectionController.deleteSection)

export default router
