import express from "express";
import { changePassword, create, deleteUser,index, login, projectList, resetPassword, updateInfo, updateProfileImage } from "../controllers/Users.js";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import {userValidation, loginValidation, resetPasswordValidation, updateUserInfoValidation, passwordValidation} from "../validations/Users.js";


const router = express.Router()

router.get("/", authenticateToken, index)
router.route("/").post(validate(userValidation), create)
router.route("/").patch(authenticateToken, validate(updateUserInfoValidation), updateInfo)
router.route("/:id").delete(authenticateToken, deleteUser)
router.route("/login").post(validate(loginValidation), login)
router.route("/projects").get(authenticateToken, projectList) //get projects belong the active user
router.route("/reset-password").post(validate(resetPasswordValidation), resetPassword)
router.route("/change-password").patch(authenticateToken, validate(passwordValidation), changePassword)
router.route("/update-profile-image").patch(authenticateToken, updateProfileImage)

export default router
