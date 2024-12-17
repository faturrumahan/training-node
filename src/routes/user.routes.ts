import CUser from "@/controllers/user.controller"
import { Router } from "express"

const router = Router()

router.get("/", CUser.getAllUsers)
router.get("/:id", CUser.getUserById)
router.patch("/:id/:role", CUser.patchUserRole)

export default router
