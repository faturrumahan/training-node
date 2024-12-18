import CProject from "@/controllers/project.controller"
import { Router } from "express"

const router = Router()

router.get("/", CProject.getAllProjects)
router.get("/:id", CProject.getProjectById)
router.post("/", CProject.createProject)
router.patch("/:id/", CProject.updateProject)
router.delete("/:id/", CProject.deleteProject)
router.post("/add-user", CProject.addUserToProject)
router.post("/remove-user", CProject.deleteUserFromProject)

export default router
