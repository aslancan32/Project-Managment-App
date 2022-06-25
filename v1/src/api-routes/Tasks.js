import express from "express";
import authenticateToken from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import taskController from "../controllers/Tasks.js";
import { taskCommentValiation, taskUpdateValiation, taskValiation } from "../validations/Tasks.js";
import idChecker from "../middlewares/idChecker.js";

const router = express.Router()

router.get("/:taskId",idChecker("taskId"), authenticateToken, taskController.showTask)
router.route("/").post(authenticateToken,validate(taskValiation), taskController.create)
router.route("/:taskId/add-comment").post(idChecker("taskId"), authenticateToken,validate(taskCommentValiation), taskController.addComment)
router.route("/:taskId").patch(idChecker("taskId"),authenticateToken,validate(taskUpdateValiation), taskController.update)
router.route("/:taskId/add-sub-task").post(idChecker("taskId"), authenticateToken,validate(taskValiation),taskController.addSubTask)
// router.route("/:sectionId").delete(authenticateToken, deleteSection)

export default router
