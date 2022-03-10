import express from "express";
import { create,deleteProject,index, update } from "../controllers/Projects.js";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import { projectCreteValiation as schema } from "../validations/Projects.js";

const router = express.Router()

router.get("/",authenticateToken, index)
router.route("/").post(authenticateToken,validate(schema), create)
router.route("/:id").patch(authenticateToken,validate(schema), update)
router.route("/:id").delete(authenticateToken, deleteProject)

export default router
