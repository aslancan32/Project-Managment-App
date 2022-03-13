import express from "express";
import UserController from "../controllers/Users.js";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import {userValidation, loginValidation, resetPasswordValidation, updateUserInfoValidation, passwordValidation} from "../validations/Users.js";


const router = express.Router()

router.get("/", authenticateToken, UserController.index)
router.route("/").post(validate(userValidation), UserController.create)
router.route("/").patch(authenticateToken, validate(updateUserInfoValidation), UserController.updateInfo)
router.route("/:id").delete(authenticateToken, UserController.deleteUser)
router.route("/login").post(validate(loginValidation), UserController.login)
router.route("/projects").get(authenticateToken, UserController.projectList) //get projects belong the active user
router.route("/reset-password").post(validate(resetPasswordValidation), UserController.resetPassword)
router.route("/change-password").patch(authenticateToken, validate(passwordValidation), UserController.changePassword)
router.route("/update-profile-image").patch(authenticateToken, UserController.updateProfileImage)

export default router
