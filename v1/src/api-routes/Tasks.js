import express from "express";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import taskController from "../controllers/Tasks.js";
import { taskCommentValiation, taskUpdateValiation, taskValiation } from "../validations/Tasks.js";

const router = express.Router()

router.get("/:taskId",authenticateToken, taskController.showTask)
router.route("/").post(authenticateToken,validate(taskValiation), taskController.create)
router.route("/:taskId/add-comment").post(authenticateToken,validate(taskCommentValiation), taskController.addComment)
router.route("/:taskId").patch(authenticateToken,validate(taskUpdateValiation), taskController.update)
router.route("/:taskId/add-sub-task").post(authenticateToken,validate(taskValiation),taskController.addSubTask)
// router.route("/:sectionId").delete(authenticateToken, deleteSection)

export default router
