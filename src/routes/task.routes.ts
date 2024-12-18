import CTask from "@/controllers/task.controller"
import { Router } from "express"

const router = Router()

router.get("/", CTask.getAllTasks)
router.get("/:id", CTask.getTaskById)
router.post("/", CTask.createTask)
router.patch("/:id/", CTask.updateTask)
router.delete("/:id/", CTask.deleteTask)
router.get("project/:projectId/", CTask.getTaskByProject)

export default router
