import express from "express";
import projectController from "../controllers/Projects.js";
import authenticateToken from "../middlewares/authenticate.js";
import idChecker from "../middlewares/idChecker.js";
import validate from "../middlewares/validate.js";
import { projectCreteValiation as schema } from "../validations/Projects.js";

const router = express.Router()

router.get("/",authenticateToken, projectController.index)
router.route("/").post(authenticateToken,validate(schema), projectController.create)
router.route("/:id").patch(idChecker(), authenticateToken,validate(schema), projectController.update)
router.route("/:id").delete(idChecker(), authenticateToken, projectController.deleteProject)

export default router
