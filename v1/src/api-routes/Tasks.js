import express from "express";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import { create,deleteSection,showTask, addComment, update, addSubTask } from "../controllers/Tasks.js";
import { taskCommentValiation, taskUpdateValiation, taskValiation } from "../validations/Tasks.js";

const router = express.Router()

router.get("/:taskId",authenticateToken, showTask)
router.route("/").post(authenticateToken,validate(taskValiation), create)
router.route("/:taskId/add-comment").post(authenticateToken,validate(taskCommentValiation), addComment)
router.route("/:taskId").patch(authenticateToken,validate(taskUpdateValiation), update)
router.route("/:taskId/add-sub-task").post(authenticateToken,validate(taskValiation),addSubTask)
// router.route("/:sectionId").delete(authenticateToken, deleteSection)

export default router
