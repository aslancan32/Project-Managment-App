import express from "express";
import { create,index, login, projectList, resetPassword, updateUserInfo } from "../controllers/Users.js";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import {userValidation, loginValidation, resetPasswordValidation, updateUserInfoValidation} from "../validations/Users.js";


const router = express.Router()

router.get("/", authenticateToken, index)
router.route("/").post(validate(userValidation), create)
router.route("/").patch(authenticateToken, validate(updateUserInfoValidation), updateUserInfo)
router.route("/login").post(validate(loginValidation), login)
router.route("/projects").get(authenticateToken, projectList)
router.route("/reset-password").post(validate(resetPasswordValidation), resetPassword)

export default router
