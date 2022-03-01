import express from "express";
import { create,index } from "../controllers/Projects.js";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import { prejectCreteValiation as schema } from "../validations/Projects.js";

const router = express.Router()

router.get("/",authenticateToken, index)
router.route("/").post(authenticateToken,validate(schema), create)

export default router
