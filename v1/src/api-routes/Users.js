import express from "express";
import { create,index, login } from "../controllers/Users.js";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import {userValidation, loginValidation} from "../validations/Users.js";


const router = express.Router()

router.get("/", authenticateToken, index)
router.route("/").post(authenticateToken,validate(userValidation), create)
router.route("/login").post(validate(loginValidation), login)

export default router
