import express from "express";
import { create,index } from "../controllers/Projects.js";
import validate from "../middlewares/validate.js";
import { prejectCreteValiation as schema } from "../validations/Projects.js";

const router = express.Router()

router.get("/", index)
router.route("/").post(validate(schema), create)

export {router}
