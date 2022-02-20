import express from "express";
import { projects,index } from "../controllers/Projects.js";

const router = express.Router()

router.get("/", index)
router.post("/", projects)

export {  router}
